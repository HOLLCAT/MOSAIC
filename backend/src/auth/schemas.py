from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    confirm_password: str

    @field_validator("password")
    @classmethod
    def password_complexity(cls, value):
        if len(value) < 8:
            raise ValueError("Password should be at least 8 characters long")
        return value


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenData(BaseModel):
    id: str = Field(alias="sub")
    email: EmailStr
    role: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


class UserResponse(BaseModel):
    name: str
    email: EmailStr
    access_token: str
    token_type: str
