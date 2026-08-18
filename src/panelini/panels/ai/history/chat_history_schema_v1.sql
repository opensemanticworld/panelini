CREATE TABLE IF NOT EXISTS folders (
    id         TEXT PRIMARY KEY,
    user_id    TEXT NOT NULL,
    name       TEXT NOT NULL,
    parent_id  TEXT REFERENCES folders(id) ON DELETE SET NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS conversations (
    id                 TEXT PRIMARY KEY,
    user_id            TEXT NOT NULL,
    title              TEXT NOT NULL DEFAULT 'New Chat',
    pinned             INTEGER NOT NULL DEFAULT 0,
    archived           INTEGER NOT NULL DEFAULT 0,
    folder_id          TEXT REFERENCES folders(id) ON DELETE SET NULL,
    current_message_id TEXT,
    created_at         TEXT NOT NULL,
    updated_at         TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
    id                TEXT PRIMARY KEY,
    conversation_id   TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    user_id           TEXT NOT NULL,
    role              TEXT NOT NULL CHECK (role IN ('human', 'ai', 'tool', 'system')),
    content           TEXT NOT NULL,
    extra             TEXT,
    parent_message_id TEXT,
    created_at        TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS ix_conv_user_updated ON conversations(user_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS ix_conv_user_archived ON conversations(user_id, archived);
CREATE INDEX IF NOT EXISTS ix_conv_folder_user ON conversations(folder_id, user_id);
CREATE INDEX IF NOT EXISTS ix_msg_conv_created ON messages(conversation_id, created_at);
CREATE INDEX IF NOT EXISTS ix_folder_user ON folders(user_id);
