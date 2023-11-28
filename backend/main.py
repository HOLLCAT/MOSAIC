from fastapi import FastAPI
from article import article
from user import user

app = FastAPI()

app.include_router(article)

app.include_router(user)

if __name__ == '__main__':
    from uvicorn import run
    run('main:app', reload=True)