from fastapi import Response
from passlib.context import CryptContext
from secrets import token_bytes
from base64 import b64encode
from src.auth.config import jwt_settings
import datetime

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return bcrypt_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt_context.verify(plain_password, hashed_password)


def generate_refresh_token():
    return b64encode(token_bytes(64)).decode("utf-8")


def generate_refresh_cookie(token: str, response: Response):
    response.set_cookie(key="refresh_token", value=token, httponly=True)


def generate_refresh_token_expiry():
    current_time = datetime.datetime.utcnow()
    expiry_time = current_time + datetime.timedelta(
        days=float(jwt_settings.REFRESH_TOKEN_EXPIRE_DAYS)
    )

    return expiry_time.strftime("%Y-%m-%d %H:%M:%S")


def check_refresh_token_expiry(refresh_token_expiry: str):
    current_time = datetime.datetime.utcnow()
    expiry_time = datetime.datetime.strptime(refresh_token_expiry, "%Y-%m-%d %H:%M:%S")

    print(refresh_token_expiry)
    if current_time > expiry_time:
        return True

    return False
