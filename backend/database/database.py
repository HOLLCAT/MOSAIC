from models.study import Study, StudyUpdate
from models.counter import Counter
from typing import List
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import HTTPException, FastAPI
from config.config import Settings
from bson import ObjectId

study_collection = Study
counter_collection = Counter

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

async def add_study(db, new_study: Study) -> Study:
    custom_id = await get_next_mosaic_id(db)
    new_study.accession_id = custom_id
    study = await new_study.create()
    return study


async def get_all_studies() -> List[dict]:
    studies = await study_collection.all().to_list()
    return [convert_objectid_to_str(study.dict()) for study in studies]

async def get_study_by_id(accession_id: str) -> dict:
    study = await Study.find_one(Study.accession_id == accession_id)
    if not study:
        raise HTTPException(status_code=404, detail="Study not found")
    
    return convert_objectid_to_str(study.dict())

async def delete_study_by_id(accession_id: str) -> dict:
    study = await Study.find_one(Study.accession_id == accession_id)
    if study is None:
        raise HTTPException(status_code=404, detail="Study not found")
    
    await study.delete()
    return convert_objectid_to_str(study.dict())


async def update_study_by_id(accession_id: str, study_update: StudyUpdate) -> dict:
    study = await Study.find_one(Study.accession_id == accession_id)
    if study is None:
        raise HTTPException(status_code=404, detail="Study not found")

    # Only include fields in the update that were explicitly set
    for field, value in update_data.items():
        if field=="extra_fields":
            t = value
            for a,b in t.items():
                if b!="":
                    setattr(study.extra_fields,a,b)
        else:
            if value!="":
                setattr(study, field, value)

    await study.save()
    return convert_objectid_to_str(study.dict())



