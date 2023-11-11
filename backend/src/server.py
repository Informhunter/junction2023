import re
from typing import Annotated, Iterable, Sequence

import numpy as np
from fastapi import Body, FastAPI

from src.llm.extraction_chain import EXTRACTION_CHAIN
from src.llm.severity_level import SeverityLevel
from src.models import HowtoSuggestion
from src.retriever import search_wikihow


app = FastAPI()

_N_SUGGESTIONS_TO_RETURN = 3


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

    suggestions = await _parse_llm_response(response, paragraph_id)

    suggestions = _sort_suggestions(_filter_suggestions(suggestions))

    return suggestions[:_N_SUGGESTIONS_TO_RETURN]


async def _parse_llm_response(response: Sequence[dict[str, str]], paragraph_id: int) -> list[HowtoSuggestion]:
    suggestions = []
    for i, output in enumerate(response):
        search_result = None
        wikihow_results = await search_wikihow(output['text'])
        if wikihow_results:
            search_result = wikihow_results[0]

        suggestions.append(
            HowtoSuggestion(
                paragraph_id=paragraph_id,
                search_result=search_result,
                **output,
            ),
        )

    return suggestions


def _filter_suggestions(suggestions: Iterable[HowtoSuggestion]) -> Iterable[HowtoSuggestion]:
    for suggestion in suggestions:
        if (
            suggestion.text.lstrip().lower().startswith('how to')
            and suggestion.severity_level != SeverityLevel.NO_PROBLEM
        ):
            yield suggestion


def _sort_suggestions(suggestions: Iterable[HowtoSuggestion]) -> list[HowtoSuggestion]:
    return sorted(suggestions, key=lambda suggestion: suggestion.severity_level, reverse=True)
