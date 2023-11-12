from enum import Enum
from pydantic import BaseModel

from src.llm.severity_level import SeverityLevel


class SuggestionType(str, Enum):
    CHIT_CHAT = 'chit-chat'
    HOW_TO = 'how-to'


class WikihowSearchResult(BaseModel):
    url: str
    title: str
    thumbnail_url: str | None


class Suggestion(BaseModel):
    type: SuggestionType
    paragraph_id: int
    severity_level: SeverityLevel
    text: str
    search_result: WikihowSearchResult
