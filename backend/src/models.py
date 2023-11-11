from pydantic import BaseModel


class DummyRandomResponse(BaseModel):
    number: float
