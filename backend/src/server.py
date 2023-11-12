import re
from typing import Annotated, Iterable, Sequence

import numpy as np
from fastapi import Body, FastAPI

from src.llm.chit_chat_chain import CHIT_CHAT_CHAIN
from src.llm.extraction_chain import EXTRACTION_CHAIN
from src.llm.severity_level import SeverityLevel
from src.llm.summarization_chain import SUMMARIZATION_CHAIN
from src.models import Suggestion, SuggestionType, WikihowSearchResult
from src.retriever import search_wikihow


app = FastAPI()

_N_SUGGESTIONS_TO_RETURN = 3


@app.get('/healthcheck')
async def random():
    return {'number': np.random.rand() * 100}


@app.post('/note')
async def suggest(note: Annotated[str, Body()], summarize: bool = False) -> list[Suggestion]:
    if not note:
        return []

    suggestions = await _get_suggestions_with_llm(note)

    if len(suggestions) > 0:
        if summarize:
            suggestions[0] = await _add_summary(suggestions[0])

        return suggestions

    return await _get_chit_chat_suggestion(note)


async def _get_suggestions_with_llm(note: str) -> list[Suggestion]:
    paragraphs = re.split(r'\n{2,}', note.strip())

    # TODO: not only last paragraph
    # TODO: truncate input text to fit context length
    paragraph_id = len(paragraphs) - 1
    text = paragraphs[paragraph_id]

    response = await EXTRACTION_CHAIN.ainvoke(text)

    suggestions = await _parse_llm_response(response, paragraph_id)

    suggestions = _sort_suggestions(_filter_suggestions(suggestions))

    suggestions = suggestions[:_N_SUGGESTIONS_TO_RETURN]

    return suggestions


async def _parse_llm_response(response: Sequence[dict[str, str]], paragraph_id: int) -> list[Suggestion]:
    suggestions = []
    for output in response:
        search_result = None
        wikihow_results = await search_wikihow(output['text'])
        if wikihow_results:
            search_result = wikihow_results[0]

        suggestions.append(
            Suggestion(
                type=SuggestionType.HOW_TO,
                paragraph_id=paragraph_id,
                search_result=search_result,
                **output,
            ),
        )

    return suggestions


def _filter_suggestions(suggestions: Iterable[Suggestion]) -> Iterable[Suggestion]:
    for suggestion in suggestions:
        if (
            suggestion.text.lstrip().lower().startswith('how to')
            and suggestion.severity_level != SeverityLevel.NO_PROBLEM
        ):
            yield suggestion


def _sort_suggestions(suggestions: Iterable[Suggestion]) -> list[Suggestion]:
    return sorted(suggestions, key=lambda suggestion: suggestion.severity_level, reverse=True)


async def _get_chit_chat_suggestion(note: str) -> list[Suggestion]:
    paragraphs = re.split(r'\n{2,}', note.strip())
    chit_chat = await _generate_chit_chat_suggestion(paragraphs)
    return [
        Suggestion(
            type=SuggestionType.CHIT_CHAT,
            paragraph_id=len(paragraphs) - 1,
            text=paragraphs[-1],
            search_result=WikihowSearchResult(
                title=chit_chat,
                url='',
                thumbnail_url=None,
            ),
            severity_level=SeverityLevel.NO_PROBLEM,
        ),
    ]


async def _generate_chit_chat_suggestion(paragraphs: list[str]) -> str:
    response = await CHIT_CHAT_CHAIN.ainvoke(paragraphs[-1])
    if response:
        return response.content
    return ''


async def _add_summary(suggestion: Suggestion) -> Suggestion:
    if suggestion.search_result:
        suggestion.search_summary = await SUMMARIZATION_CHAIN.ainvoke(suggestion.search_result.url)

    return suggestion
