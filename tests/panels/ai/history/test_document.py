"""Tests for the v2 conversation document layer: schema and converters."""

from __future__ import annotations

import pytest

from panelini.panels.ai.history import Attachment, InMemoryHistoryStore
from panelini.panels.ai.history.document import (
    conversation_from_document,
    conversation_to_document,
    document_context,
    folder_from_document,
    folder_to_document,
    load_schema,
    messages_from_document,
    validate_conversation_document,
    validate_folder_document,
)

pytestmark = pytest.mark.ai

USER = "alice"


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

    def test_valid_folder_document_passes(self) -> None:
        store = InMemoryHistoryStore()
        parent = store.create_folder(USER, "Projects")
        child = store.create_folder(USER, "Sub", parent_id=parent.id)
        validate_folder_document(folder_to_document(child))

    def test_folder_document_without_a_name_is_rejected(self) -> None:
        pytest.importorskip("jsonschema")
        with pytest.raises(ValueError, match="required"):
            validate_folder_document({
                "schema_version": 2,
                "type": "Folder",
                "id": "f1",
                "created_at": "2026-01-01T00:00:00",
                "updated_at": "2026-01-01T00:00:00",
            })

    def test_a_conversation_document_is_not_a_folder(self) -> None:
        """The two kinds validate separately, so the type must match."""
        pytest.importorskip("jsonschema")
        store = InMemoryHistoryStore()
        record = store.get_conversation(USER, store.create_conversation(USER).id)
        assert record is not None
        with pytest.raises(ValueError, match="name"):
            validate_folder_document(conversation_to_document(record, []))

    def test_multi_folder_membership_and_fork_links_pass(self) -> None:
        store = InMemoryHistoryStore()
        work = store.create_folder(USER, "Work")
        ideas = store.create_folder(USER, "Ideas")
        source = store.create_conversation(USER, title="source", folder_ids=[work.id, ideas.id])
        store.append_message(USER, source.id, "human", "q")
        fork = store.fork_conversation(USER, source.id)
        record = store.get_conversation(USER, fork.id)
        assert record is not None

        document = conversation_to_document(record, store.load_messages(USER, fork.id))

        assert sorted(document["folder_ids"]) == sorted([work.id, ideas.id])
        assert document["parent_id"] == source.id
        validate_conversation_document(document)

    def test_duplicate_folder_ids_are_rejected(self) -> None:
        pytest.importorskip("jsonschema")
        store = InMemoryHistoryStore()
        record = store.get_conversation(USER, store.create_conversation(USER).id)
        assert record is not None
        document = conversation_to_document(record, [])
        document["folder_ids"] = ["f1", "f1"]
        with pytest.raises(ValueError, match="unique"):
            validate_conversation_document(document)

    def test_attachment_without_a_name_is_rejected(self) -> None:
        pytest.importorskip("jsonschema")
        store = InMemoryHistoryStore()
        record = store.get_conversation(USER, store.create_conversation(USER).id)
        assert record is not None
        document = conversation_to_document(record, [])
        document["messages"] = [
            {
                "id": "m1",
                "role": "human",
                "content": "see attached",
                "created_at": "2026-01-01T00:00:00",
                "attachments": [{"id": "a1"}],
            }
        ]
        with pytest.raises(ValueError, match="required"):
            validate_conversation_document(document)


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

    def test_attachments_survive_the_roundtrip(self) -> None:
        store = InMemoryHistoryStore()
        conv = store.create_conversation(USER, title="with files")
        attachment = Attachment(
            id="a1",
            name="notes.txt",
            media_type="text/plain",
            size=5,
            url="data:text/plain;base64,aGVsbG8=",
            text="hello",
        )
        store.append_message(USER, conv.id, "human", "see attached", attachments=[attachment])
        record = store.get_conversation(USER, conv.id)
        assert record is not None
        messages = store.load_messages(USER, conv.id)

        document = conversation_to_document(record, messages)
        validate_conversation_document(document)

        assert messages_from_document(document)[0].attachments == (attachment,)

    def test_folder_roundtrip(self) -> None:
        store = InMemoryHistoryStore()
        parent = store.create_folder(USER, "Projects")
        child = store.create_folder(USER, "Sub", parent_id=parent.id)

        assert folder_from_document(folder_to_document(child)) == child
