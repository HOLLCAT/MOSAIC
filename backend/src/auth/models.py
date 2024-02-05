from beanie import Document
from pydantic import EmailStr
from typing import Optional


class User(Document):
    name: str
    email: EmailStr
    hashed_password: str
    role: Optional[str] = None
    organization: Optional[str] = None
