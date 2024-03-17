from typing import List

from src.study.models import Study
from src.study.service import get_study_by_id

from src.dashboard.schemas import Collaborator, CreateCollaborator
from src.dashboard.schemas import CreateAuditMessage, Audit
from src.dashboard.constants import ActionMessage

study_collection = Study


async def get_user_studies(owner_id: str) -> List[Study]:
    user_studies = (
        await study_collection.find({"owner_id": owner_id})
        .find({"pending": False})
        .to_list(length=100)
    )

    return user_studies


async def get_collaborator_studies(email: str) -> List[Study]:
    collaborator_studies = await study_collection.find(
        {"$and": [{"collaborators.email": email}, {"pending": False}]}
    ).to_list(length=100)

    return collaborator_studies


async def get_user_pending_studies(owner_id: str) -> List[Study]:
    user_studies = (
        await study_collection.find({"owner_id": owner_id})
        .find({"pending": True})
        .to_list(length=100)
    )

    return user_studies


async def get_collaborator_pending_studies(email: str) -> List[Study]:
    collaborator_studies = await study_collection.find(
        {"$and": [{"collaborators.email": email}, {"pending": True}]}
    ).to_list(length=100)

    return collaborator_studies


async def check_collaborator_exists(study: Study, email: str) -> bool:
    if not study.collaborators:
        return False

    # Utilize any() for a more concise and efficient check
    return any(
        collaborator.email.lower() == email.lower()
        for collaborator in study.collaborators
    )


async def add_collaborator(
    study: Study,
    collaborator_data: CreateCollaborator,
) -> Collaborator:

    new_collaborator = Collaborator(
        email=collaborator_data.email,
        position=collaborator_data.position,
    )

    if study.collaborators is None:
        study.collaborators = []

    study.collaborators.append(new_collaborator)
    await study.save()

    return new_collaborator


async def remove_collaborator(study: Study, collaborator_email: str) -> bool:
    if not study.collaborators:
        return False

    initial_length = len(study.collaborators)

    study.collaborators = list(
        filter(
            lambda collaborator: collaborator.email != collaborator_email,
            study.collaborators,
        )
    )

    if len(study.collaborators) < initial_length:
        await study.save()
        return True

    return False


async def create_audit(
    audit: CreateAuditMessage, study: Study, user_email, action: ActionMessage
) -> Audit:

    audit = Audit(user_email=user_email, action=action, description=audit.description)
    study.audit_messages.append(audit)

    await study.save()

    return audit


async def get_audit_messages(accession_id: str) -> List[Audit]:
    study = await get_study_by_id(accession_id)

    return study.audit_messages
