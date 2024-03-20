from typing import List, Optional
from fastapi import APIRouter, Body, Depends, status

from src.auth.jwt import parse_jwt
from src.auth.schemas import TokenData
from src.auth.exceptions import AuthRequired
from src.auth.service import get_user_name, get_user_by_email
from src.auth.exceptions import UserNotFound, UserCannotGetAuditMessages

from src.study.exceptions import StudyNotFound

from src.dashboard import service
from src.dashboard.schemas import (
    CollaboratorResponse,
    CreateCollaborator,
    StudyResponse,
    AuditMessageResponse,
)
from src.dashboard.exceptions import (
    UserCannotAddCollaborator,
    UserCannotAddSelfAsCollaborator,
    CollaboratorAlreadyExists,
    CollaboratorNotFound,
    UserCannotRemoveCollaborator,
    UserCannotGetCollaborators,
    UserCannotPublishStudy,
    PendingStudyCannotBePublished,
)

router = APIRouter()


@router.get(
    "/studies",
    response_description="Search studies by owner",
    response_model=List[StudyResponse],
)
async def user_studies(
    user: TokenData = Depends(parse_jwt), status: Optional[str] = None
) -> List[StudyResponse]:
    studies = None

    if user is None:
        raise AuthRequired()

    if status and status == "pending":
        studies = await service.get_user_pending_studies(user.id)
        collaboratorStudies = await service.get_collaborator_pending_studies(user.email)
        studies.extend(collaboratorStudies)
    else:
        studies = await service.get_user_studies(user.id)
        collaboratorStudies = await service.get_collaborator_studies(user.email)
        studies.extend(collaboratorStudies)

    if not studies:
        raise StudyNotFound()

    return [
        StudyResponse(
            **study.model_dump(),
            isOwner=study.owner_id == user.id,
        )
        for study in studies
    ]


@router.post(
    "/{accession_id}/add-collaborator",
    status_code=status.HTTP_201_CREATED,
    response_description="New team member added to the study",
    response_model=CollaboratorResponse,
)
async def add_study_collaborator(
    accession_id: str,
    collaborator_data: CreateCollaborator,
    user: TokenData = Depends(parse_jwt),
) -> CollaboratorResponse:
    study = await service.get_study_by_id(accession_id)

    if not study:
        raise StudyNotFound()

    if study.owner_id != user.id:
        raise UserCannotAddCollaborator()

    if collaborator_data.email == user.email:
        raise UserCannotAddSelfAsCollaborator()

    collaborator_user = await get_user_by_email(collaborator_data.email)

    if not collaborator_user:
        raise UserNotFound()

    if await service.check_collaborator_exists(study, collaborator_user.email):
        raise CollaboratorAlreadyExists()

    new_collaborator = await service.add_collaborator(study, collaborator_data)

    return CollaboratorResponse(
        **new_collaborator.model_dump(),
        name=await get_user_name(new_collaborator.email),
    )


@router.delete(
    "/{accession_id}/remove-collaborator",
    status_code=status.HTTP_204_NO_CONTENT,
    response_description="Team member deleted from the study",
)
async def remove_study_collaborator(
    accession_id: str,
    collaborator_email: str = Body(...),
    user: TokenData = Depends(parse_jwt),
):
    study = await service.get_study_by_id(accession_id)

    if not study:
        raise StudyNotFound()

    if study.owner_id != user.id:
        raise UserCannotRemoveCollaborator()

    collaborator_user = await get_user_by_email(collaborator_email)

    if not collaborator_user:
        raise UserNotFound()

    success = await service.remove_collaborator(study, collaborator_email)

    if not success:
        raise CollaboratorNotFound()

    return status.HTTP_204_NO_CONTENT


@router.get(
    "/{accession_id}/collaborators",
    response_description="Get collaborators of a study",
    response_model=List[CollaboratorResponse],
)
async def get_study_collaborators(
    accession_id: str, user: TokenData = Depends(parse_jwt)
) -> List[CollaboratorResponse]:
    study = await service.get_study_by_id(accession_id)

    if not study:
        raise StudyNotFound()

    if study.owner_id == user.id and study.collaborators is None:
        return []

    if (
        study.owner_id != user.id
        and study.collaborators is None
        and not any(
            collaborator.email == user.email for collaborator in study.collaborators
        )
    ):
        raise UserCannotGetCollaborators()

    return [
        CollaboratorResponse(
            **collaborator.model_dump(),
            name=await get_user_name(collaborator.email),
        )
        for collaborator in study.collaborators
    ]


@router.get(
    "/{accession_id}/audit-messages",
    response_description="Get audit messages of study",
    response_model=List[AuditMessageResponse],
)
async def get_study_audit_messages(
    accession_id: str, user: TokenData = Depends(parse_jwt)
) -> List[AuditMessageResponse]:
    study = await service.get_study_by_id(accession_id)

    if not study:
        raise StudyNotFound()

    if (
        study.owner_id != user.id
        and study.collaborators is None
        and not any(
            collaborator.email == user.email for collaborator in study.collaborators
        )
    ):
        raise UserCannotGetAuditMessages()

    audit_messages = await service.get_audit_messages(accession_id)

    response = []

    for msg in audit_messages:
        user_name = await get_user_name(msg.user_email)
        response.append(AuditMessageResponse(**msg.model_dump(), name=user_name))

    return response


@router.post(
    "/publish/{accession_id}",
    response_description="Publish your study",
    status_code=status.HTTP_201_CREATED,
)
async def publish_study(accession_id: str, user: TokenData = Depends(parse_jwt)):
    study = await service.get_study_by_id(accession_id)

    if not study:
        raise StudyNotFound()

    if (
        study.owner_id != user.id
        and study.collaborators is None
        and not any(
            collaborator.email == user.email for collaborator in study.collaborators
        )
    ):
        raise UserCannotPublishStudy()

    if study.pending:
        raise PendingStudyCannotBePublished()

    await service.publish_study(study)

    return status.HTTP_201_CREATED
