from typing import Optional
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic_settings import BaseSettings
from models.study import Study
from models.counter import Counter
from models.user import User
from fastapi import FastAPI


class Settings(BaseSettings):
    # database configurations
    DATABASE_URL: Optional[str] = None

    class Config:
        env_file = ".env.dev"
        from_attributes = True
        extra = "allow"


async def initiate_database(app: FastAPI):
    client = AsyncIOMotorClient(Settings().DATABASE_URL)
    app.state.mongodb_client = client
    await init_beanie(
        database=client.get_default_database(), document_models=[Study, Counter, User]
    )


async def shutdown_database(client: AsyncIOMotorClient):
    client.close()
