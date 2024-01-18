from models.study import Study, User
from models.counter import Counter
from fastapi import FastAPI
from bson import ObjectId

study_collection = Study
counter_collection = Counter
users_collection = User

async def get_database(app: FastAPI):
    return app.state.mongodb_client.get_default_database()


async def get_next_mosaic_id(db):
    counter_doc = await db.counters.find_one_and_update(
        {"name": "student_id"},
        {"$inc": {"counter": 1}},
        upsert=True,
        return_document=True
    )
    return f"MOSAIC-{counter_doc['counter']:04}"


def convert_objectid_to_str(item):
    if isinstance(item, dict):
        for key, value in item.items():
            if isinstance(value, ObjectId):
                item[key] = str(value)
            elif isinstance(value, dict):
                convert_objectid_to_str(value)
    return item


