from pydantic import BaseModel

from src.llm.severity_level import SeverityLevel


class HowtoSuggestion(BaseModel):
    paragraph_id: int
    severity_level: SeverityLevel
    text: str
