from src.auth.models import User

user_collection = User


async def get_user_by_email(email: str):
    user = await user_collection.find_one({"email": email})
    return user


async def create_user(user: User):
    await user.create()
