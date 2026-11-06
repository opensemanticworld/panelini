"""The LangChain stand-ins behave like the slice of the real messages the AI panel reads."""

from __future__ import annotations

import asyncio
import concurrent.futures
from typing import Any

import pytest

from panelini.ai_testing import AIMessage, StubChatModel


def _run(coro: Any) -> Any:
    """Run a coroutine on a fresh loop in a worker thread (the main thread may already have one)."""
    with concurrent.futures.ThreadPoolExecutor(max_workers=1) as pool:
        return pool.submit(asyncio.run, coro).result()


class TestMessageText:
    def test_string_content_is_the_text(self) -> None:
        assert AIMessage(content="hello").text == "hello"

    @pytest.mark.parametrize(
        ("content", "expected"),
        [
            ([{"type": "text", "text": "Hello "}, {"type": "text", "text": "world"}], "Hello world"),
            ([{"type": "reasoning"}, {"type": "text", "text": "kept"}, {"type": "tool_use"}], "kept"),
            (["not a block", {"type": "text", "text": "ok"}], "ok"),
            ([], ""),
        ],
    )
    def test_block_content_keeps_only_text_blocks(self, content: list[Any], expected: str) -> None:
        assert AIMessage(content=content).text == expected


class TestStubChatModel:
    def test_chunks_carry_text(self) -> None:
        model = StubChatModel(reply="abcde", chunk_size=2, delay=0)

        async def collect() -> list[str]:
            return [chunk.text async for chunk in model.astream()]

        assert _run(collect()) == ["ab", "cd", "e"]

    def test_ainvoke_returns_the_reply_as_text(self) -> None:
        assert _run(StubChatModel(reply="canned").ainvoke()).text == "canned"
