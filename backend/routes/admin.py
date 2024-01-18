from fastapi import APIRouter, Depends, HTTPException
from database.admin import *
from database.study import *
from models.study import StudyUpdate
import logging
from routes.user import get_current_user


router = APIRouter()
logging.basicConfig(level=logging.INFO)


@router.get("/", response_description="Welcome to the admin API")
async def admin_root():
    return {"message": "Welcome to the admin API"}


@router.get("/all-studies", response_description="Studies retrieved")
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


@router.get("/all-users", response_description="Users retrieved")
async def get_users(user: dict = Depends(get_current_user)):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")

    if user["role"] != "admin":
        raise HTTPException(
            status_code=403, detail="Permission denied to view all users"
        )

    try:
        users = await get_all_users(user["role"])
        if not users:
            raise HTTPException(status_code=404, detail="No users found")

        logging.info(f"{len(users)} users retrieved")
        return users
    except Exception as e:
        logging.error(f"Error retrieving users: {e}")
        if isinstance(e, HTTPException):
            raise e
        else:
            raise HTTPException(status_code=500, detail=str(e))


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
