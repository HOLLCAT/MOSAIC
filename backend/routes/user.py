from datetime import timedelta
from typing import Annotated
from fastapi import HTTPException, Depends, FastAPI, APIRouter
from database.database import get_database
from starlette import status
from models.user import CreateUserRequest, User, Token
from fastapi.security import OAuth2PasswordRequestForm
from database.database import *
from dependencies import get_app
from auth.auth import *

router = APIRouter()
users_collection = User


@router.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    app: FastAPI = Depends(get_app),
):
    db = await get_database(app)

    # Authenticate the user
    user = await authenticate_user(db, form_data.username, form_data.password)

    # Raise an exception if the user doesn't exist
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate user credentials",
        )

    # creates the access token and allows it to expire in 60 minutes
    token = create_access_token(user.email, user.id, user.role, timedelta(minutes=280))

    return {"name": user.name, "access_token": token, "token_type": "bearer"}


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_user_route(
    create_user_request: CreateUserRequest, app: FastAPI = Depends(get_app)
):
    db = await get_database(app)

    new_user = await create_user(db, create_user_request)

    token = create_access_token(
        new_user.email, new_user.id, new_user.role, timedelta(minutes=60)
    )
    return {
        "name": new_user.name,
        "access_token": token,
    }


@router.get("/user", status_code=status.HTTP_200_OK)
async def get_user(
    user: Annotated[dict, Depends(get_current_user)], app: FastAPI = Depends(get_app)
):
    db = await get_database(app)

    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    # Get the user from the database
    user = await User.find_one(User.email == user["email"])

    # Return the user
    return {"User": user}
