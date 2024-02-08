# Stage 1: Run tests
FROM python:3.10-alpine AS builder

WORKDIR /core
COPY . .

RUN pip install -r requirements.txt
RUN python -m pytest tests/ -p no:cacheprovider -v


# Stage 2: Build final image
FROM python:3.10-alpine

WORKDIR /app

COPY --from=builder /core/src ./src
COPY --from=builder /core/.env.dev /app
COPY --from=builder /core/requirements.txt /app

RUN pip install -r requirements.txt
RUN pip uninstall -y pytest pytest-asyncio

CMD ["uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]