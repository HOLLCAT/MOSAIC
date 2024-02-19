from fastapi import FastAPI
from contextlib import asynccontextmanager

from src.database import initiate_database, shutdown_database
from src.study.router import router as StudyRouter
from src.auth.router import router as AuthRouter
from src.files.router import router as FilesRouter
from src.middleware import LogMiddleware


@asynccontextmanager
async def db_lifespan(app: FastAPI):
    await initiate_database(app)
    yield
    await shutdown_database(app.state.mongodb_client)


app = FastAPI(lifespan=db_lifespan)

app.add_middleware(LogMiddleware)


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app."}


app.include_router(StudyRouter, tags=["Study"], prefix="/study")
app.include_router(AuthRouter, tags=["auth"], prefix="/auth")
app.include_router(FilesRouter, tags=["Files"], prefix="/study")
