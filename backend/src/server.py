import re
from collections.abc import Iterable
from typing import Annotated, Generator

import numpy as np
from fastapi import Body, FastAPI

from src.llm.extraction_chain import EXTRACTION_CHAIN
from src.llm.severity_level import SeverityLevel
from src.models import HowtoSuggestion
from src.retriever import search_wikihow


app = FastAPI()


@app.get('/healthcheck')
async def random():
    return {'number': np.random.rand()}


@app.post('/note')
async def suggest(note: Annotated[str, Body()]) -> list[HowtoSuggestion]:
    return await _get_suggestions_with_llm(note)


async def _get_suggestions_with_llm(note: str) -> list[HowtoSuggestion]:
    if not note:
        return []

    paragraphs = re.split(r'\n{2,}', note.strip())

    # TODO: not only last paragraph
    # TODO: truncate input text to fit context length
    paragraph_id = len(paragraphs) - 1
    text = paragraphs[paragraph_id]

    response = await EXTRACTION_CHAIN.ainvoke(text)
    suggestions = (
        HowtoSuggestion(
            paragraph_id=paragraph_id,
            search_results=await search_wikihow(suggestion['text'])[:3],
            **suggestion,
        ) for suggestion in response
    )

    suggestions = _filter_suggestions(suggestions)
    return list(suggestions)


def _filter_suggestions(suggestions: Iterable[HowtoSuggestion]) -> Generator[HowtoSuggestion, None, None]:
    for suggestion in suggestions:
        if (
            suggestion.text.lstrip().lower().startswith('how to')
            and suggestion.severity_level != SeverityLevel.NO_PROBLEM
        ):
            yield suggestion
