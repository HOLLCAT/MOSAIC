from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: str

    class Config:
        env_file = ".env.dev"
        from_attributes = True
        extra = "allow"


jwt_settings = Settings()
