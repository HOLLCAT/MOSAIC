from uvicorn import run

from fastapi import FastAPI
from article import article
if __name__ == '__main__':
    run('main:app', reload=True)

app = FastAPI()
app.include_router(article)