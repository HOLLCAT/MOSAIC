from fastapi import FastAPI
from article import article

app = FastAPI()
app.include_router(article)

if __name__ == '__main__':
    from uvicorn import run
    run('main:app', reload=True)