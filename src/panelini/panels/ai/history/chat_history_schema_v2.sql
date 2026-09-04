-- Document storage: one row per conversation or folder document. The body
-- is the JSON document defined by chat_history_schema_v2.json; user_id,
-- kind, and updated_at mirror body fields for indexing. Maps 1:1 onto a
-- Postgres JSONB table or a browser object store.

CREATE TABLE IF NOT EXISTS documents (
    id         TEXT PRIMARY KEY,
    user_id    TEXT NOT NULL,
    kind       TEXT NOT NULL CHECK (kind IN ('conversation', 'folder')),
    updated_at TEXT NOT NULL,
    body       TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS ix_doc_user_kind_updated
    ON documents(user_id, kind, updated_at DESC);
