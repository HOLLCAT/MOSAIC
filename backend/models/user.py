from beanie import Document
from pydantic import BaseModel, EmailStr, validator
from typing import Optional


class User(Document):
    name: str
    email: EmailStr
    hashed_password: str
    role: Optional[str] = None


class CreateUserRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    confirm_password: str
    role: Optional[str] = None

    @validator("password")
    def password_complexity(cls, value):
        if len(value) < 8:
            raise ValueError("Password should be at least 8 characters long")
        return value


class Token(BaseModel):
    access_token: str
    token_type: str
