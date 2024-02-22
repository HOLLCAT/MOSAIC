from datetime import datetime, timedelta

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt as auth_jwt

from src.auth.config import jwt_settings
from src.auth.exceptions import InvalidToken
from src.auth.schemas import TokenData


oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/auth/token")


def generate_jwt(email: str, user_id: str, role: str):
    expires = datetime.utcnow() + timedelta(
        minutes=float(jwt_settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    jwt_data = {
        "sub": str(user_id),
        "email": email,
        "role": role,
        "exp": expires,
    }

    return auth_jwt.encode(
        jwt_data, jwt_settings.SECRET_KEY, algorithm=jwt_settings.ALGORITHM
    )


def parse_jwt(token: str = Depends(oauth2_bearer)) -> TokenData | None:
    if not token:
        return None

    try:
        payload = auth_jwt.decode(
            token, jwt_settings.SECRET_KEY, algorithms=[jwt_settings.ALGORITHM]
        )
    except JWTError:
        raise InvalidToken()

    return TokenData(**payload)

