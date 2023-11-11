import os

from langchain.chat_models import ChatOpenAI


_OPENAI_SECRET_KEY = os.environ.get('OPENAI_SECRET_KEY')
_OPENAI_ORGANISATION_ID = os.environ.get('OPENAI_ORGANISATION_ID')

# _OPENAI_MODEL_NAME = 'gpt-3.5-turbo'
_OPENAI_MODEL_NAME = 'gpt-4-1106-preview'

OPENAI_MODEL = ChatOpenAI(
    model_name=_OPENAI_MODEL_NAME,
    temperature=0,
    max_tokens=500,
    openai_organization=_OPENAI_ORGANISATION_ID,
    openai_api_key=_OPENAI_SECRET_KEY,
)
