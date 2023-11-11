from pydantic import BaseModel

from src.llm.severity_level import SeverityLevel


class WikihowSearchResult(BaseModel):
    url: str
    title: str
    thumbnail_url: str | None


class HowtoSuggestion(BaseModel):
    paragraph_id: int
    severity_level: SeverityLevel
    text: str
    search_result: WikihowSearchResult
