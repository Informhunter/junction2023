import numpy as np
from fastapi import FastAPI

from src.models import DummyRandomResponse


app = FastAPI()


@app.get('/')
def get_root() -> str:
    return 'eh, pepsiccolniy'


@app.get('/random')
def get_random(mean: float = 0.0, std: float = 1.0) -> DummyRandomResponse:
    return DummyRandomResponse(number=float(np.random.normal(mean, std)))
