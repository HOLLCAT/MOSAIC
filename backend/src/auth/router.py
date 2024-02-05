from typing import Annotated
from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm

from src.auth import service
from src.auth.models import User
from src.auth.schemas import UserResponse, RegisterRequest, LoginRequest
from src.auth.exceptions import InvalidCredentials, EmailTaken
from src.auth import utils, jwt

router = APIRouter()


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
        name=user.name, email=user.email, access_token=token, token_type="bearer"
    )


@router.post("/login", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def login(request: LoginRequest) -> UserResponse:
    user = await service.get_user_by_email(request.email)
    if not user:
        raise InvalidCredentials()

    if not utils.verify_password(request.password, user.hashed_password):
        raise InvalidCredentials()

    token = jwt.generate_jwt(user.email, user.id, user.role)

    return UserResponse(
        name=user.name, email=user.email, access_token=token, token_type="bearer"
    )


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
    request: RegisterRequest,
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

    return UserResponse(
        name=user.name, email=user.email, access_token=token, token_type="bearer"
    )
