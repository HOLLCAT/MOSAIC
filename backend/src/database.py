from typing import Optional
from beanie import init_beanie
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic_settings import BaseSettings
from fastapi import FastAPI

from src.study.models import Study, Counter
from src.auth.models import User


class Settings(BaseSettings):
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


async def get_database(app: FastAPI):
    return app.state.mongodb_client.get_default_database()


def convert_objectid_to_str(item):
    if isinstance(item, dict):
        for key, value in item.items():
            if isinstance(value, ObjectId):
                item[key] = str(value)
            elif isinstance(value, dict):
                convert_objectid_to_str(value)
    return item
