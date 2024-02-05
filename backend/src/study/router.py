from typing import List
from fastapi import APIRouter, Depends, FastAPI, UploadFile, File, Form, status

from src.auth.jwt import parse_jwt
from src.auth.schemas import TokenData

from src.database import get_database
from src.dependencies import get_app

from src.study import service, utils
from src.study.exceptions import (
    StudyNotFound,
    UserCannotDeleteStudy,
    UserCannotUpdateStudy,
    TitleMissing,
    InvalidSamples,
)
from src.exceptions import ServerError
from src.study.schemas import CreateStudy, StudyResponse, StudyUpdate, Sample

router = APIRouter()


@router.get(
    "/",
    response_description="Studies retrieved",
    response_model=List[StudyResponse],
    status_code=status.HTTP_200_OK,
)
async def get_studies() -> List[StudyResponse]:
    try:
        studies = await service.get_studies()
        return studies

    except Exception as e:
        raise ServerError(detail=str(e))


@router.get(
    "/{accession_id}",
    response_description="Study retrieved",
    response_model=StudyResponse,
    status_code=status.HTTP_200_OK,
)
async def get_study(accession_id: str) -> StudyResponse:
    study = await service.get_study_by_id(accession_id)
    if not study:
        raise StudyNotFound()

    return StudyResponse(**study.dict())


@router.get(
    "/search/{title}",
    response_description="Search studies by title",
    response_model=List[StudyResponse],
)
async def search_studies(title: str = None) -> List[StudyResponse]:
    if title is None:
        raise TitleMissing()

    try:
        studies = await service.get_search_studies(title)
        return [StudyResponse(**study.dict()) for study in studies]

    except Exception as e:
        raise StudyNotFound()


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_description="Study added to the database",
    response_model=StudyResponse,
)
async def add_study_route(
    study: CreateStudy,
    app: FastAPI = Depends(get_app),
    user: TokenData = Depends(parse_jwt),
) -> StudyResponse:

    db = await get_database(app)

    study.owner_id = user.id

    new_study = await service.create_study(db, study)

    for index, sample in enumerate(new_study.samples):
        new_sample = sample.model_copy(
            update={"Sample_Project": new_study.accession_id}
        )
        new_study.samples[index] = new_sample

    await new_study.save()

    return StudyResponse(**new_study.dict())


@router.delete(
    "/{accession_id}",
    response_description="Study deleted from the database",
    response_model=StudyResponse,
    status_code=status.HTTP_200_OK,
)
async def delete_study(
    accession_id: str,
    user: TokenData = Depends(parse_jwt),
):

    study = await service.get_study_by_id(accession_id)
    if not study:
        raise StudyNotFound()

    if study.owner_id != user.id:
        raise UserCannotDeleteStudy()

    await service.delete_study_by_id(study)
    return StudyResponse(**study.dict())


@router.put(
    "/{accession_id}",
    response_description="Study updated in the database",
    response_model=StudyResponse,
    status_code=status.HTTP_200_OK,
)
async def update_study(
    accession_id: str,
    updated_study: StudyUpdate,
    user: TokenData = Depends(parse_jwt),
) -> StudyResponse:

    original_study = await service.get_study_by_id(accession_id)
    if not original_study:
        raise StudyNotFound()

    if original_study.owner_id != user.id:
        raise UserCannotUpdateStudy()
    print("Passed")
    study = await service.update_study_by_id(original_study, updated_study)
    return StudyResponse(**study.dict())


@router.post(
    "/upload-metadata",
    status_code=status.HTTP_201_CREATED,
    response_description="Metadata file uploaded",
    response_model=List[Sample],
)
async def upload_metadata(
    metadata: UploadFile = File(...),
    metadata_file_type: str = Form(...),
    user: TokenData = Depends(parse_jwt),
):

    samples_list = utils.FileReader(metadata.file, metadata_file_type).process_file()

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
        raise InvalidSamples(detail=str(e))

    return samples
