from typing import List
from src.study.models import Study
from src.study.schemas import HomePageData, StudyUpdate, CreateStudy

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


async def get_study_by_id(accession_id: str) -> Study:
    study = await study_collection.find_one({"accession_id": accession_id})
    return study


async def get_avaliable_study_by_id(accession_id: str) -> Study:
    study = await study_collection.find_one(
        {"accession_id": accession_id, "pending": False, "isPublished": True}
    )
    return study


async def create_study(db, study: CreateStudy) -> Study:
    new_study = Study(**study.model_dump())
    custom_id = await get_next_mosaic_id(db)
    new_study.accession_id = custom_id
    await new_study.create()
    return new_study


async def get_search_studies(search_query: str) -> List[Study]:
    query = {
        "title": {"$regex": search_query, "$options": "i"},
        "pending": False,
        "isPublished": True,
    }
    studies = await study_collection.find(query).to_list(length=100)
    return studies


async def delete_study_by_id(study: Study) -> Study:
    await study.delete()
    return study


async def update_study_by_id(study: Study, updated_study: StudyUpdate) -> Study:
    for field, value in updated_study.model_dump(exclude_unset=True).items():
        if field != 'samples':
            setattr(study, field, value)
        else:
            for sample, updated_sample in zip(study.samples, value):
                for sample_field, sample_value in updated_sample.items():
                    if sample_field != 'File':
                        setattr(sample, sample_field, sample_value)
    await study.save()
    return study


async def get_study_and_samples_count() -> HomePageData:
    studies = await study_collection.find({}).to_list(length=1000)
    total_projects = len(studies)
    total_files = 0
    for study in studies:
        for sample in study.samples:
            if sample.File:
                total_files += 1
    total_samples = sum(len(study.samples) for study in studies)
    return HomePageData(projects=total_projects, genes=total_samples, files=total_files)
