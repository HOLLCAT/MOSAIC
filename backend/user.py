from fastapi import APIRouter
from pydantic import BaseModel
# This is waiting to be edited.
# Obviously you can just copy from article.py
# I will do it later
class User(BaseModel):
    username: str
    password: str

    
user = APIRouter(tags=['user part'])

@user.get("/user", summary="get currnet user")
async def user_get():
    pass

@user.post("/article", summary="register a user account")
async def user_create():
    pass

@user.put("/article", summary="edit accounts information")
async def user_update():
    pass

@user.delete("/article", summary="delete user")
async def article_delete():
    pass