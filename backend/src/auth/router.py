import datetime
from typing import Annotated
from fastapi import APIRouter, Depends, Response, status, Request
from fastapi.security import OAuth2PasswordRequestForm

from src.auth import service
from src.auth.models import User
from src.auth.schemas import UserResponse, RegisterRequest, LoginRequest, TokenData
from src.auth.exceptions import (
    AuthorizationFailed,
    EmailTaken,
    InvalidCredentials,
    InvalidToken,
)
from src.auth import utils, jwt
from src.auth.config import jwt_settings

router = APIRouter()


@router.post("/login", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def login(request: LoginRequest, response: Response) -> UserResponse:
    user = await service.get_user_by_email(request.email)
    if not user:
        raise InvalidCredentials()

    if not utils.verify_password(request.password, user.hashed_password):
        raise InvalidCredentials()

    token = jwt.generate_jwt(user.email, user.id, user.role)

    refresh_token = utils.generate_refresh_token()
    await service.set_user_refresh_token(
        user,
        refresh_token,
        utils.generate_refresh_token_expiry(),
    )

    utils.generate_refresh_cookie(refresh_token, response)

    return UserResponse(
        name=user.name, email=user.email, access_token=token
    )


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
    request: RegisterRequest,
    response: Response,
) -> UserResponse:

    if await service.get_user_by_email(request.email):
        raise EmailTaken()

    user = User(
        name=request.name,
        email=request.email,
        hashed_password=utils.hash_password(request.password),
    )

    await service.create_user(user)
    token = jwt.generate_jwt(user.email, user.id, user.role)

    refresh_token = utils.generate_refresh_token()
    await service.set_user_refresh_token(
        user,
        refresh_token,
        utils.generate_refresh_token_expiry(),
    )
    utils.generate_refresh_cookie(refresh_token, response)

    return UserResponse(
        name=user.name, email=user.email, access_token=token
    )


@router.post("/logout", status_code=status.HTTP_200_OK)
async def logout(
    response: Response,
    user: TokenData = Depends(jwt.parse_jwt),
):
    if not user:
        raise InvalidToken()

    user = await service.get_user_by_email(user.email)

    if not user:
        raise AuthorizationFailed()

    if not user.refresh_token:
        raise InvalidToken()
    
    await service.set_user_refresh_token(user, None, None)
    response.delete_cookie("refresh_token")

    return status.HTTP_200_OK


@router.post("/refresh-token", status_code=status.HTTP_200_OK)
async def refresh_token(request: Request):
    refresh_token = request.cookies.get("refresh_token")

    if not refresh_token:
        raise InvalidToken()

    user = await service.get_user_by_refresh_token(refresh_token)

    if not user:
        raise InvalidToken()

    if utils.check_refresh_token_expiry(user.refresh_token_expiry):
        raise InvalidToken()

    token = jwt.generate_jwt(user.email, user.id, user.role)

    return UserResponse(
        name=user.name, email=user.email, access_token=token
    )


@router.post("/token", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def login_for_openapi(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> UserResponse:

    user = await service.get_user_by_email(form_data.username)
    if not user:
        raise InvalidCredentials()

    if not utils.verify_password(form_data.password, user.hashed_password):
        raise InvalidCredentials()

    token = jwt.generate_jwt(user.email, user.id, user.role)

    return UserResponse(
        name=user.name, email=user.email, access_token=token
    )
