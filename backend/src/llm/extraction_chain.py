import os

from langchain.chat_models import ChatOpenAI
from langchain.output_parsers.openai_functions import JsonKeyOutputFunctionsParser
from langchain.prompts import ChatPromptTemplate
from langchain.schema.runnable import RunnablePassthrough


OPENAI_SECRET_KEY = os.environ.get('OPENAI_SECRET_KEY')
OPENAI_ORGANISATION_ID = os.environ.get('OPENAI_ORGANISATION_ID')

EXTRACTION_INSTRUCTION = """
Given a sentence of a diary, identify what the person would benefit from getting information about.
Reformulate in a way "how to <problem>".
""".strip()


EXTRACTION_PROMPT_TEMPLATE = ChatPromptTemplate.from_messages(
    [
        ('human', EXTRACTION_INSTRUCTION),
        ('human', 'Diary:\n```{note}```'),
    ],
)

EXTRACTION_FUNCTION = {
    'name': 'howto_problems',
    'description': 'problems extracted from the user diary notes but in format suitable for search in HowTo wiki',
    'parameters': {
        'type': 'object',
        'properties': {
            'problems': {
                'type': 'array',
                'items': {
                    'type': 'string',
                    'description': "Should be in format: 'how to <reformulated problem>'",
                },
            },
        },
        'required': ['problems'],
    },
}


MODEL_NAME = 'gpt-3.5-turbo'

MODEL = ChatOpenAI(
    model_name=MODEL_NAME,
    temperature=0,
    max_tokens=2000,
    openai_organization=OPENAI_ORGANISATION_ID,
    openai_api_key=OPENAI_SECRET_KEY,
)


EXTRACTION_CHAIN = (
    {'note': RunnablePassthrough()}
    | EXTRACTION_PROMPT_TEMPLATE
    | MODEL.bind(function_call={'name': EXTRACTION_FUNCTION['name']}, functions=[EXTRACTION_FUNCTION])
    | JsonKeyOutputFunctionsParser(key_name='problems')
)
