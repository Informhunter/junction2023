import re
from typing import Annotated

import numpy as np
from fastapi import Body, FastAPI

from src.llm.extraction_chain import EXTRACTION_CHAIN
from src.models import HowtoSuggestion


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
    # TODO: truncate
    paragraph_id = len(paragraphs) - 1
    text = paragraphs[paragraph_id]

    response = await EXTRACTION_CHAIN.ainvoke(text)
    # TODO: keep only starting with "how to"
    return [HowtoSuggestion(paragraph_id=paragraph_id, text=text) for text in response]
