import os

from langchain.chat_models import ChatOpenAI


_OPENAI_SECRET_KEY = os.environ.get('OPENAI_SECRET_KEY')
_OPENAI_ORGANISATION_ID = os.environ.get('OPENAI_ORGANISATION_ID')


OPENAI_EXTRACTION_MODEL = ChatOpenAI(
    model_name='gpt-4-1106-preview',
    temperature=0,
    max_tokens=500,
    openai_organization=_OPENAI_ORGANISATION_ID,
    openai_api_key=_OPENAI_SECRET_KEY,
)

OPENAI_SUMMARIZATION_MODEL = ChatOpenAI(
    model_name='gpt-3.5-turbo-1106',
    temperature=0,
    max_tokens=100,
    openai_organization=_OPENAI_ORGANISATION_ID,
    openai_api_key=_OPENAI_SECRET_KEY,
)

OPENAI_MODEL_SHORT = ChatOpenAI(
    model_name='gpt-3.5-turbo-1106',
    temperature=0.5,
    max_tokens=20,
    openai_organization=_OPENAI_ORGANISATION_ID,
    openai_api_key=_OPENAI_SECRET_KEY,
)
