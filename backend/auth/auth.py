from datetime import timedelta, datetime
from typing import Annotated
from fastapi import HTTPException, Depends
from starlette import status
from models.user import CreateUserRequest, User
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from dotenv import load_dotenv
import os
import logging

# disables passlib logging
logging.getLogger("passlib").setLevel(logging.ERROR)

# loads secret key and algorithm from .env file
load_dotenv(".env.dev")
# Accessing environment variables
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

# used to hash/unhash passwords
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/auth/login")


async def create_user(db, new_user: CreateUserRequest) -> User:
    # Check if the email already exists
    existing_user = await User.find_one({"email": new_user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered."
        )

    # Hash the password
    hashed_password = bcrypt_context.hash(new_user.password)

    # Create the user instance
    user = User(
        name=new_user.name,
        email=new_user.email,
        hashed_password=hashed_password,
        role=new_user.role,
    )

    # Insert the new user into the database
    await user.insert()

    return user


def create_access_token(email: str, user_id: str, role: str, expires_delta: timedelta):
    # Create the JWT token

    # Add the email and user_id to the payload
    encode = {"sub": email, "id": str(user_id), "role": role}
    # Add the expiration time to the payload
    expires = datetime.utcnow() + expires_delta
    # Encodes the payload
    encode.update({"exp": expires})

    # Return the encoded token using the secret key & algorithm
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


async def authenticate_user(db, email: str, password: str):
    # Check if the email exists
    user = await User.find_one(User.email == email)

    # Return false if the email doesn't exist
    if not user:
        return False

    # Check if the password is correct
    if not bcrypt_context.verify(password, user.hashed_password):
        return False

    # Return the user if the email and password are correct
    return user


async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    # Decode the JWT token using try/except
    try:
        # Retrieves the payload from the token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        user_id: str = payload.get("id")
        role: str = payload.get("role")

        # Raise an exception if the email or user_id is None
        if email is None or user_id is None:
            raise HTTPException(status_code=401, detail="Could not validate user")

        # Else it returns the email and user_id
        return {"email": email, "id": user_id, "role": role}

    # Raises an exception if the token is invalid
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate user")
