from fastapi import APIRouter, Depends, FastAPI, UploadFile, File, Form, HTTPException
from database.database import (
    get_database,
    get_all_studies,
    get_study_by_id,
    add_study,
    delete_study_by_id,
    update_study_by_id,
)
from models.study import Study, StudyUpdate, Sample
from dependencies import get_app
from typing import List
from helper.metadataParser.FileReader import FileReader
import logging

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
        study = await get_study_by_id(accession_id)
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


@router.post("/", status_code=201)
async def add_study_route(
    title: str = Form(...),
    authors: List[str] = Form(...),
    description: str = Form(...),
    study_type: str = Form(...),
    metadata_file_type: str = Form(...),
    metadata: UploadFile = File(...),
    app: FastAPI = Depends(get_app),
):
    db = await get_database(app)

    study = Study(
        study_title=title,
        authors=authors,
        study_description=description,
        study_type=study_type,
        samples=[],
    )

    new_study = await add_study(db, study)
    samples_list = FileReader(metadata.file, metadata_file_type).process_file()

    try:
        samples = [
            Sample(
                **data,
                Sample_Project=new_study.accession_id,
                Biological_Repeat=data["Biological Repeat"],
                Biomaterial_provider=data["Biomaterial Provider"],
            )
            for data in samples_list
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
async def delete_study(accession_id: str):
    try:
        deleted_study = await delete_study_by_id(accession_id)
        if not deleted_study:
            raise HTTPException(status_code=404, detail="Study not found")

        logging.info(f"Study {accession_id} deleted")
        return deleted_study

    except Exception as e:
        logging.error(f"Error retrieving studies: {e}")
        if isinstance(e, HTTPException):
            raise e
        else:
            raise HTTPException(status_code=500, detail=str(e))


@router.put("/{accession_id}", response_description="Study updated in the database")
async def update_study(accession_id: str, study: StudyUpdate):
    try:
        updated_study = await update_study_by_id(accession_id, study)
        if not updated_study:
            raise HTTPException(status_code=404, detail="Study not found")
        
        logging.info(f"Study {accession_id} updated")
        return updated_study
    except Exception as e:
        logging.error(f"Error retrieving studies: {e}")
        if isinstance(e, HTTPException):
            raise e
        else:
            raise HTTPException(status_code=500, detail=str(e))


@router.delete("/clear-studies")
async def clear_studies():
    try:
        # This will delete all documents in the Study collection
        await Study.delete_all()
        return {"message": "All studies have been deleted"}
    except Exception as e:
        logging.error(f"Error clearing studies: {e}")
        raise HTTPException(status_code=500, detail=str(e))
