from langchain.chains.combine_documents.stuff import StuffDocumentsChain
from langchain.chains.llm import LLMChain
from langchain.document_loaders import WebBaseLoader
from langchain.prompts import PromptTemplate
from langchain.schema.runnable import RunnableLambda

from src.llm.openai import OPENAI_CHAT_GPT_MODEL


_SUMMARIZATION_PROMPT_TEMPLATE = """
Write a concise summary of the following text. Summary should contain only top 3 the most important statements.
Each statement should be no longer than 10 words. You should always prefer short summaries.

Output format:
``1. <statemant 1>\n2. <statement 2>\n3. <statement3>
```

```{text}```
CONCISE SUMMARY:
""".strip()


_SUMMARIZATION_PROMPT = PromptTemplate.from_template(_SUMMARIZATION_PROMPT_TEMPLATE)


SUMMARIZATION_CHAIN = (
    RunnableLambda(lambda url: WebBaseLoader(url).load())
    | StuffDocumentsChain(
        llm_chain=LLMChain(llm=OPENAI_CHAT_GPT_MODEL, prompt=_SUMMARIZATION_PROMPT),
        document_variable_name='text',
    )
    | RunnableLambda(lambda output: output['output_text'])
)
