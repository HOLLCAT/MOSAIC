from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: Optional[str] = None
    ALGORITHM: Optional[str] = None
    ACCESS_TOKEN_EXPIRE_MINUTES: Optional[str] = None
    REFRESH_TOKEN_EXPIRE_DAYS: Optional[str] = None

    class Config:
        env_file = ".env.dev"
        from_attributes = True
        extra = "allow"


jwt_settings = Settings()
