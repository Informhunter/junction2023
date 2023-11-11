from pydantic import BaseModel


class HowtoSuggestion(BaseModel):
    paragraph_id: int
    text: str
