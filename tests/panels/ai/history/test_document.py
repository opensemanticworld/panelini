"""Tests for the v2 conversation document layer: schema and converters."""

from __future__ import annotations

from dataclasses import replace
from typing import Any

import pytest

from panelini.panels.ai.history import InMemoryHistoryStore
from panelini.panels.ai.history.document import (
    conversation_from_document,
    conversation_to_document,
    document_context,
    folder_to_document,
    load_schema,
    messages_from_document,
    validate_conversation_document,
    validate_folder_document,
)

pytestmark = pytest.mark.ai

USER = "alice"


def _conversation_document() -> dict[str, Any]:
    """A minimal valid conversation document, as the converters emit it."""
    store = InMemoryHistoryStore()
    record = store.get_conversation(USER, store.create_conversation(USER, title="hello").id)
    assert record is not None
    return conversation_to_document(record, [])


def _message(**overrides: Any) -> dict[str, Any]:
    """A minimal valid message document, with fields overridden."""
    return {"id": "m1", "role": "human", "content": "hi", "created_at": "2026-01-01T00:00:00"} | overrides


class TestSchema:
    def test_schema_is_valid_json_schema(self) -> None:
        """The bundled schema must satisfy the draft 2020-12 meta-schema."""
        jsonschema = pytest.importorskip("jsonschema")
        jsonschema.Draft202012Validator.check_schema(load_schema())

    def test_schema_is_an_oold_document(self) -> None:
        """The @context maps document properties to vocabulary terms."""
        context = document_context()
        assert context["title"] == "schema:name"
        assert context["created_at"] == "schema:dateCreated"
        assert context["updated_at"] == "schema:dateModified"
        assert context["Conversation"] == "schema:Conversation"
        assert context["Folder"] == "schema:Collection"
        assert context["@version"] == 1.1

    def test_id_valued_terms_are_links(self) -> None:
        """Pointers between documents must coerce to IRIs, not stay literals.

        Without ``@type: @id`` every reference is a plain string and the graph
        the @context describes has no edges at all.
        """
        context = document_context()
        for term in ("folder_ids", "parent_id", "forked_from_message_id", "current_message_id"):
            assert context[term]["@type"] == "@id", term

    def test_array_terms_declare_a_set_container(self) -> None:
        """OO-LD: a strictly-array property must declare ``@container: @set``."""
        context = document_context()
        for term in ("folder_ids", "messages", "attachments"):
            assert context[term]["@container"] == "@set", term

    def test_valid_document_passes(self) -> None:
        store = InMemoryHistoryStore()
        conv = store.create_conversation(USER, title="hello")
        store.append_message(USER, conv.id, "human", "hi")
        record = store.get_conversation(USER, conv.id)
        assert record is not None
        document = conversation_to_document(record, store.load_messages(USER, conv.id))
        validate_conversation_document(document)

    def test_invalid_role_is_rejected(self) -> None:
        pytest.importorskip("jsonschema")
        store = InMemoryHistoryStore()
        conv = store.create_conversation(USER)
        record = store.get_conversation(USER, conv.id)
        assert record is not None
        document = conversation_to_document(record, [])
        document["messages"] = [{"id": "x", "role": "wizard", "content": "hi", "created_at": "2026-01-01T00:00:00"}]
        with pytest.raises(ValueError, match="wizard"):
            validate_conversation_document(document)

    def test_missing_required_field_is_rejected(self) -> None:
        pytest.importorskip("jsonschema")
        with pytest.raises(ValueError, match="required"):
            validate_conversation_document({"schema_version": 2, "type": "Conversation"})

    def test_conversation_with_folders_and_a_fork_pointer_passes(self) -> None:
        """A chat filed under two folders, forked from a known message."""
        document = _conversation_document()
        document["folder_ids"] = ["work", "reading"]
        document["parent_id"] = "conv-1"
        document["forked_from_message_id"] = "msg-7"
        validate_conversation_document(document)

    def test_duplicate_folder_ids_are_rejected(self) -> None:
        """folder_ids is a set, so the schema says so rather than the context alone."""
        pytest.importorskip("jsonschema")
        document = _conversation_document()
        document["folder_ids"] = ["work", "work"]
        with pytest.raises(ValueError, match="non-unique"):
            validate_conversation_document(document)

    def test_message_attachments_pass(self) -> None:
        """An inline payload, a bare reference, and one the store dropped."""
        document = _conversation_document()
        document["messages"] = [
            _message(
                attachments=[
                    {
                        "id": "a1",
                        "name": "plot.png",
                        "media_type": "image/png",
                        "size": 91,
                        "url": "data:image/png;base64,iVBORw0KGgo=",
                        "width": 4,
                        "height": 4,
                    },
                    {"name": "notes.txt", "text": "extracted for model context"},
                    {"id": "a3", "name": "big.pdf", "size": 9_000_000, "omitted": True},
                ]
            )
        ]
        validate_conversation_document(document)

    def test_attachment_without_a_name_is_rejected(self) -> None:
        """name is the one property every export format carries."""
        pytest.importorskip("jsonschema")
        document = _conversation_document()
        document["messages"] = [_message(attachments=[{"id": "a1", "media_type": "image/png"}])]
        with pytest.raises(ValueError, match="required"):
            validate_conversation_document(document)

    def test_valid_folder_document_passes(self) -> None:
        store = InMemoryHistoryStore()
        parent = store.create_folder(USER, "Work")
        validate_folder_document(folder_to_document(store.create_folder(USER, "Notes", parent.id)))

    def test_folder_of_the_wrong_type_is_rejected(self) -> None:
        pytest.importorskip("jsonschema")
        store = InMemoryHistoryStore()
        document = folder_to_document(store.create_folder(USER, "Work"))
        document["type"] = "Conversation"
        with pytest.raises(ValueError, match="Folder"):
            validate_folder_document(document)

    def test_folder_missing_required_field_is_rejected(self) -> None:
        pytest.importorskip("jsonschema")
        with pytest.raises(ValueError, match="required"):
            validate_folder_document({"schema_version": 2, "type": "Folder"})

    def test_root_schema_accepts_both_document_types(self) -> None:
        """Consumers validate against the published file, whose root is a oneOf.

        Each document must match exactly one branch, so this also guards against
        the two $defs overlapping.
        """
        jsonschema = pytest.importorskip("jsonschema")
        store = InMemoryHistoryStore()
        conv = store.create_conversation(USER, title="hello")
        record = store.get_conversation(USER, conv.id)
        assert record is not None
        jsonschema.validate(conversation_to_document(record, []), load_schema())
        jsonschema.validate(folder_to_document(store.create_folder(USER, "Work")), load_schema())


class TestConverters:
    def test_conversation_roundtrip(self) -> None:
        store = InMemoryHistoryStore()
        conv = store.create_conversation(USER, title="roundtrip")
        store.append_message(USER, conv.id, "human", "q", extra={"a": 1})
        store.append_message(USER, conv.id, "ai", "a")
        record = store.get_conversation(USER, conv.id)
        assert record is not None
        messages = store.load_messages(USER, conv.id)

        document = conversation_to_document(record, messages)
        assert conversation_from_document(document) == record
        assert messages_from_document(document) == messages

    def test_placements_and_fork_pointers_roundtrip(self) -> None:
        """Every placement survives, and the fork pointers with them."""
        store = InMemoryHistoryStore()
        work = store.create_folder(USER, "Work")
        reading = store.create_folder(USER, "Reading")
        conv = store.create_conversation(USER, folder_ids=[work.id, reading.id])
        record = store.get_conversation(USER, conv.id)
        assert record is not None
        forked = replace(record, parent_id="conv-1", forked_from_message_id="msg-7")

        document = conversation_to_document(forked)
        validate_conversation_document(document)
        assert conversation_from_document(document) == forked

    def test_a_document_without_placements_reads_as_the_root(self) -> None:
        """Foreign documents carry no folder_ids; that is the root, not an error."""
        document = _conversation_document()
        del document["folder_ids"]
        assert conversation_from_document(document).folder_ids == ()
