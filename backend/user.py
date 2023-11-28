from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from database import get_user_by_email, add_user, delete_user 

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

user_router = APIRouter(tags=['user part'])

@user_router.post("/register", summary="register a user account")
async def register(user: UserCreate):
    # Check if the user already exists
    if get_user_by_email(user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = pwd_context.hash(user.password)
    # Add user to the database (function to be implemented)
    add_user(user.full_name, user.email, hashed_password)
    return {"message": "User registered successfully"}

@user_router.post("/login", summary="user login")
async def login(form_data: UserLogin):
    # Authenticate user (function to be implemented)
    user = get_user_by_email(form_data.email)
    if not user or not pwd_context.verify(form_data.password, user['hashed_password']):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    # Return JWT token (token generation logic to be implemented)
    return {"access_token": "token", "token_type": "bearer"}

@user_router.delete("/user", summary="delete user")
async def delete(email: EmailStr):
    # Delete user logic (function to be implemented)
    result = delete_user(email)
    if result:
        return {"message": "User deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="User not found")

# Additional routes and logic
# not completed