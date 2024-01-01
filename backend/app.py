from fastapi import FastAPI
from contextlib import asynccontextmanager
from config.config import initiate_database, shutdown_database 
from routes.study import router as StudyRouter

@asynccontextmanager
async def db_lifespan(app: FastAPI):
    await initiate_database(app)
    yield
    await shutdown_database(app.state.mongodb_client)

app = FastAPI(lifespan=db_lifespan)

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app."}

app.include_router(StudyRouter, tags=["Study"], prefix="/study")
