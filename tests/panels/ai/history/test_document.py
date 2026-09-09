"""Tests for the v2 conversation document layer: schema and converters."""

from __future__ import annotations

import pytest

from panelini.panels.ai.history import InMemoryHistoryStore
from panelini.panels.ai.history.document import (
    conversation_from_document,
    conversation_to_document,
    document_context,
    load_schema,
    messages_from_document,
    validate_conversation_document,
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
