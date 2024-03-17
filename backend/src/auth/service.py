from src.auth.models import User

user_collection = User


async def get_user_by_email(email: str):
    user = await user_collection.find_one({"email": email})
    return user


async def create_user(user: User):
    await user.create()


async def get_user_name(email: str):
    user = await user_collection.find_one({"email": email})

    if user is None:
        return None

    return user.name


async def get_user_by_refresh_token(refresh_token: str):
    user = await user_collection.find_one({"refresh_token": refresh_token})
    return user

async def set_user_refresh_token(user: User, refresh_token: str, expires: str):
    user.refresh_token = refresh_token
    user.refresh_token_expiry = expires
    await user.save()