from fastapi import APIRouter, Body, Depends, FastAPI, UploadFile
from database.database import *
from models.counter import *
from models.study import *
from dependencies import get_app
router = APIRouter()


@router.get("/", response_description="Studies retrieved")
async def get_studies():
    studies = await get_all_studies()
    if studies:
        return {
            "data": studies
        }
    else:
        return {
            "status_code": 404,
            "response_type": "error",
            "description": "No studies found",
        }



@router.get("/{accession_id}", response_description="Study retrieved")
async def get_study(accession_id: str):
    study = await get_study_by_id(accession_id)
    return {
        "data": study
    } 
    
    
@router.post("/", response_description="Study added into the database")
async def add_study_route(study: Study, app: FastAPI = Depends(get_app)):
    db = await get_database(app)
    new_study = await add_study(db, study)
    print(new_study)
    return {
        "status_code": 201,
        "response_type": "success",
        "description": "Operation successful",
        "data": new_study
    }

    
@router.delete("/{accession_id}", response_description="Study deleted from the database")
async def delete_study(accession_id: str):
    deleted_study = await delete_study_by_id(accession_id)
    if deleted_study:
        return {
            "data": deleted_study
        }
        
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Study not found",
    }
    

@router.put("/{accession_id}", response_description="Study updated in the database")
async def update_study(accession_id: str, study: Study = Body(...)):
    updated_study = await update_study_by_id(accession_id, study)
    if updated_study:
        return {
            "data": updated_study
        }
        
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Study not found",
    }
    
@router.delete("/clear-studies")
async def clear_studies():
    try:
        # This will delete all documents in the Study collection
        await Study.delete_all()

        return {"message": "All studies have been deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
