from fastapi import APIRouter, Request, status, Depends
from fastapi.responses import Response

from src.auth.jwt import parse_jwt
from src.auth.schemas import TokenData

from src.study.service import get_study_by_id
from src.study.exceptions import StudyNotFound

from src.files import service
from src.files.exceptions import (
    StudySamplesAlreadyUploaded,
    UserCannotUploadFile,
    SampleNotFound,
)
from src.files.utils import *

from pathlib import Path

router = APIRouter()


@router.post(
    "/upload/{accession_id}/{sample_id}",
    response_description="File uploaded successfully",
    status_code=status.HTTP_200_OK,
)
async def add_file_route(
    accession_id: str,
    sample_id: str,
    request: Request,
    user: TokenData = Depends(parse_jwt),
):
    study = await get_study_by_id(accession_id)
    if not study:
        raise StudyNotFound()

    if study.owner_id != user.id:
        raise UserCannotUploadFile()

    if study.pending == False:
        raise StudySamplesAlreadyUploaded()

    valid_sample_id = False
    for sample in study.samples:
        if str(sample.Sample_ID) == sample_id:
            valid_sample_id = True
            break

    if not valid_sample_id:
        raise SampleNotFound()

    await save_file(request, study, sample_id)
    
    is_all_files_uploaded = await service.is_all_files_uploaded(study)
    if is_all_files_uploaded:
        await service.update_study_pending_status(study)

    return status.HTTP_200_OK


@router.get(
    "/download/{accession_id}/{sample_id}",
    response_description="File downloaded successfully",
    status_code=status.HTTP_200_OK,
)
async def download_file_route(accession_id: str, sample_id: str):
    study = await get_study_by_id(accession_id)
    if not study:
        raise StudyNotFound()

    file = await service.get_file_metadata(study, sample_id)
    accession_id = study.accession_id

    if file is None:
        raise FileNotFound()

    file_uuid = file.file_uuid
    original_filename = file.file_name

    file = f"{file_uuid}{Path(original_filename).suffix}"
    file_path = Path(UPLOAD_DIR) / file

    if not file_path.is_file():
        raise FileNotFound()

    response = Response()
    response.headers["X-Accel-Redirect"] = f"/protected/{file}"
    response.headers["Content-Disposition"] = (
        f"attachment; filename={accession_id}_{sample_id}{Path(original_filename).suffix}"
    )
    return response


@router.delete(
    "/delete/{accession_id}/{sample_id}",
    response_description="File deleted successfully",
    status_code=status.HTTP_200_OK,
)
async def delete_file_route(
    accession_id: str,
    sample_id: str,
    user: TokenData = Depends(parse_jwt),
):
    study = await get_study_by_id(accession_id)
    if not study:
        raise StudyNotFound()

    if study.owner_id != user.id:
        raise UserCannotUploadFile()

    file = await service.get_file_metadata(study, sample_id)

    if file is None:
        raise FileNotFound()

    file_uuid = file.file_uuid
    original_filename = file.file_name

    file_path = Path(UPLOAD_DIR) / f"{file_uuid}{Path(original_filename).suffix}"

    if not file_path.is_file():
        raise FileNotFound()

    file_path.unlink()

    await service.delete_file_metadata(study, sample_id)

    return status.HTTP_200_OK


@router.put(
    "/update/{accession_id}/{sample_id}",
    response_description="File updated successfully",
    status_code=status.HTTP_200_OK,
)
async def update_file_route(
    accession_id: str,
    sample_id: str,
    request: Request,
    user: TokenData = Depends(parse_jwt),
):
    study = await get_study_by_id(accession_id)
    if not study:
        raise StudyNotFound()

    if study.owner_id != user.id:
        raise UserCannotUploadFile()

    file = await service.get_file_metadata(study, sample_id)

    if file is None:
        raise FileNotFound()

    # Deletes old file to replace with new file
    await delete_file(study, sample_id)

    # Processes the new file upload
    await save_file(request, study, sample_id)

    return status.HTTP_200_OK
