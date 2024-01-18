from typing import List
from database.database import *


async def get_all_users(user_role: str) -> List[dict]:
    users = await users_collection.all().to_list()
    return [convert_objectid_to_str(user.dict()) for user in users]
