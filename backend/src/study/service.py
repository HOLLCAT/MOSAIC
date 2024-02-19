from typing import List
from src.study.models import Study
from src.study.schemas import StudyUpdate, CreateStudy

study_collection = Study


async def get_next_mosaic_id(db) -> str:
    counter_doc = await db.counters.find_one_and_update(
        {"name": "study_id"},
        {"$inc": {"counter": 1}},
        upsert=True,
        return_document=True,
    )
    return f"MOSAIC-{counter_doc['counter']:04}"


async def get_studies() -> List[Study]:
    studies = await study_collection.all().to_list(length=100)
    return studies


async def get_studies_published() -> List[Study]:
    studies = await study_collection.find({"pending": False}).to_list(length=100)
    return studies


async def get_unpublished(user_id: str) -> List[Study]:
    studies = await study_collection.find(
        {"pending": True, "owner_id": user_id}
    ).to_list(length=100)
    return studies


async def get_study_by_id(accession_id: str) -> Study:
    study = await study_collection.find_one({"accession_id": accession_id})
    return study


async def create_study(db, study: CreateStudy) -> Study:
    new_study = Study(**study.model_dump())
    custom_id = await get_next_mosaic_id(db)
    new_study.accession_id = custom_id
    await new_study.create()
    return new_study


async def get_search_studies(search_query: str) -> List[Study]:
    query = {"title": {"$regex": search_query, "$options": "i"}}
    studies = await study_collection.find(query).to_list(length=100)
    return studies


async def delete_study_by_id(study: Study) -> Study:
    await study.delete()
    return study


async def update_study_by_id(study: Study, updated_study: StudyUpdate) -> Study:
    for field, value in updated_study.model_dump(exclude_unset=True).items():
        setattr(study, field, value)

    await study.save()
    return study
