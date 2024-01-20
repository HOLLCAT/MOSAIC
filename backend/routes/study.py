from fastapi import APIRouter, Depends, FastAPI, UploadFile, File, Form, HTTPException
from database.study import *
from models.study import Study, StudyUpdate, Sample
from dependencies import get_app
from helper.metadataParser.FileReader import FileReader
import logging
from routes.user import get_current_user
from typing import List

router = APIRouter()
logging.basicConfig(level=logging.INFO)


@router.get("/", response_description="Studies retrieved")
async def get_studies():
    try:
        studies = await get_all_studies()
        if not studies:
            raise HTTPException(status_code=404, detail="No studies found")

        logging.info(f"{len(studies)} studies retrieved")
        return studies
    except Exception as e:
        logging.error(f"Error retrieving studies: {e}")
        if isinstance(e, HTTPException):
            raise e
        else:
            raise HTTPException(status_code=500, detail=str(e))


@router.get("/{accession_id}", response_description="Study retrieved")
async def get_study(accession_id: str):
    try:
        study = await get_study_by_accession_id(accession_id)
        if not study:
            raise HTTPException(status_code=404, detail="Study not found")

        logging.info(f"Study {accession_id} retrieved")
        return study
    except Exception as e:
        logging.error(f" Error retrieving studies: {e}")
        if isinstance(e, HTTPException):
            raise e
        else:
            raise HTTPException(status_code=500, detail=str(e))


@router.get("/search/{title}", response_description="Search studies by title")
async def search_studies(title: str = None):
    logging.info("search_studies endpoint called")
    if title is None:
        raise HTTPException(status_code=400, detail="Title parameter is required")

    try:
        studies = await get_studies_by_title(title)
        logging.info(f"{len(studies)} studies found for study title: '{title}'")
        return studies
    except Exception as e:
        logging.error(f"No matching studies found: {e}")
        raise HTTPException(status_code=404, detail="No matching studies found")


@router.post("/", status_code=201)
async def add_study_route(
    study: Study,
    app: FastAPI = Depends(get_app),
    user: dict = Depends(get_current_user),
):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")

    db = await get_database(app)

    
    new_study = study.owner_id = user["id"]
    new_study = await add_study(db, study)
    try:
        samples = [
            Sample(
                **{k: v for k, v in data.dict().items() if k != "Sample_Project"},
                Sample_Project=new_study.accession_id,
                fastq="",
            )
            for data in study.samples
        ]
    except Exception as e:
        logging.error(f"Error parsing samples: {e}")
        raise HTTPException(status_code=400, detail=f"Error in sample data: {e}")

    new_study.samples = samples
    await new_study.save()

    logging.info(f"Study {new_study.accession_id} added")
    return study.dict()


@router.delete(
    "/{accession_id}", response_description="Study deleted from the database"
)
async def delete_study(accession_id: str, user: dict = Depends(get_current_user)):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")

    try:
        # Pass the authenticated user's ID to the delete function
        deleted_study = await delete_study_by_id(accession_id, user["id"], user["role"])
        logging.info(f"Study {accession_id} deleted")
        return deleted_study
    except Exception as e:
        logging.error(f"Error deleting study: {e}")
        if isinstance(e, HTTPException):
            raise e
        else:
            raise HTTPException(status_code=500, detail=str(e))


@router.put("/{accession_id}", response_description="Study updated in the database")
async def update_study(
    accession_id: str, study: StudyUpdate, user: dict = Depends(get_current_user)
):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")

    try:
        # Pass the authenticated user's ID to the update function
        updated_study = await update_study_by_id(
            accession_id, study, user["id"], user["role"]
        )
        logging.info(f"Study {accession_id} updated")
        return updated_study
    except Exception as e:
        logging.error(f"Error updating study: {e}")
        if isinstance(e, HTTPException):
            raise e
        else:
            raise HTTPException(status_code=500, detail=str(e))


@router.post(
    "/upload-metadata", status_code=201, response_description="Metadata file uploaded"
)
async def upload_metadata(
    metadata: UploadFile = File(...),
    metadata_file_type: str = Form(...),
    user: dict = Depends(get_current_user),
):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")

    samples_list = FileReader(metadata.file, metadata_file_type).process_file()

    try:
        samples = [
            Sample(
                **data,
                Sample="",
                Sample_Project="",
            )
            for data in samples_list
        ]
    except Exception as e:
        logging.error(f"Error parsing samples: {e}")
        raise HTTPException(status_code=400, detail=f"Error in sample data: {e}")

    return samples
