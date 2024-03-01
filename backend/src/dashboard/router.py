from typing import List, Optional
from fastapi import APIRouter, Depends

from src.auth.jwt import parse_jwt
from src.auth.schemas import TokenData
from src.auth.exceptions import AuthRequired

from src.study.exceptions import StudyNotFound
from src.dashboard.schemas import StudyResponse

from src.dashboard import service

router = APIRouter()


@router.get(
    "/studies",
    response_description="Search studies by owner",
    response_model=List[StudyResponse],
)
async def user_studies(
    user: TokenData = Depends(parse_jwt), 
    status: Optional[str] = None
) -> List[StudyResponse]:
    studies = None

    if user is None:
        raise AuthRequired()

    if status and status == "pending":
        studies = await service.get_user_pending_studies(user.id)
    else:
        studies = await service.get_user_studies(user.id)

    if not studies:
        raise StudyNotFound()

    return [StudyResponse(**study.model_dump()) for study in studies]
