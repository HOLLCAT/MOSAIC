FROM python:3.10-alpine

WORKDIR /app

COPY ./src ./src
COPY ./.env.dev .
COPY ./requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "8000"]