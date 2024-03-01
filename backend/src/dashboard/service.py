from typing import List
from src.study.models import Study

study_collection = Study

async def get_user_studies(owner_id: str) -> List[Study]:
    user_studies = await study_collection.find({"owner_id": owner_id}).find({"pending": False}).to_list(length=100)
    return user_studies

async def get_user_pending_studies(owner_id: str) -> List[Study]:
    user_studies = await study_collection.find({"owner_id": owner_id}).find({"pending": True}).to_list(length=100)
    return user_studies
