FROM python:3.11-slim-buster

# set up locale to prevent bugs with encoding
ENV LC_ALL=C.UTF-8 LANG=C.UTF-8

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        make \
    && rm -rf /var/lib/apt/lists/*

COPY \
    pyproject.toml \
    poetry.lock \
    README.md \
    ./

COPY src src

# https://python-poetry.org/docs/#ci-recommendations
ENV POETRY_HOME=/opt/poetry POETRY_VERSION=1.6.1
RUN \
    python -m venv $POETRY_HOME && \
    $POETRY_HOME/bin/pip install --no-compile --no-cache-dir -U pip poetry==$POETRY_VERSION

RUN \
    $POETRY_HOME/bin/poetry config virtualenvs.create false \
    && $POETRY_HOME/bin/poetry install --no-interaction --no-ansi \
    && rm -rf ~/.cache/pypoetry \
    && find . -type f -name "*.py[co]" -delete -or -type d -name "__pycache__" -delete

EXPOSE 8080
CMD ["uvicorn", "src.server:app", "--host", "0.0.0.0", "--port", "8080"]
