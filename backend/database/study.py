from models.study import Study, StudyUpdate
from typing import List
from fastapi import HTTPException
from database.database import study_collection, get_next_mosaic_id, convert_objectid_to_str, get_database


async def add_study(db, new_study: Study) -> Study:
    custom_id = await get_next_mosaic_id(db)
    new_study.accession_id = custom_id
    study = await new_study.create()
    return study


async def get_studies_by_title(title: str) -> List[dict]:
    # if no title is provided, return empty list
    if not title:
        return []

    # case insensitive search for study title
    query = {"title": {"$regex": title, "$options": "i"}}
    # searches for studies with matching title
    studies = await study_collection.find(query).to_list(length=100)
    return [convert_objectid_to_str(study.dict()) for study in studies]


async def get_all_studies() -> List[dict]:
    studies = await study_collection.all().to_list()
    return [convert_objectid_to_str(study.dict()) for study in studies]


async def get_all_studies_by_user_id(user_id: str = None) -> List[dict]:
    query = {}
    if user_id:
        query["owner_id"] = user_id
    studies = await study_collection.find(query).to_list()
    return [convert_objectid_to_str(study.dict()) for study in studies]


async def get_study_by_accession_id(accession_id: str) -> dict:
    study = await study_collection.find_one(Study.accession_id == accession_id)
    if not study:
        raise HTTPException(status_code=404, detail="Study not found")

    return convert_objectid_to_str(study.dict())


async def delete_study_by_id(accession_id: str, user_id: str, user_role: str) -> dict:
    study = await Study.find_one(Study.accession_id == accession_id)
    if study is None:
        raise HTTPException(status_code=404, detail="Study not found")

    # grants access to admin users to delete any study or owner to delete their own study
    if user_role != "admin" and str(study.owner_id) != user_id:
        raise HTTPException(
            status_code=403, detail="Permission denied to delete this study"
        )

    await study.delete()
    return convert_objectid_to_str(study.dict())


async def update_study_by_id(
    accession_id: str, study_update: StudyUpdate, user_id: str, user_role: str
) -> dict:
    study = await Study.find_one(Study.accession_id == accession_id)
    if study is None:
        raise HTTPException(status_code=404, detail="Study not found")

    # grants access to admin users to delete any study or owner to delete their own study
    if user_role != "admin" and str(study.owner_id) != user_id:
        raise HTTPException(
            status_code=403, detail="Permission denied to delete this study"
        )

    for field, value in study_update.dict().items():
        if value is not None:
            setattr(study, field, value)

    await study.save()
    return convert_objectid_to_str(study.dict())
