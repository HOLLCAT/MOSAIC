from src.dashboard.constants import ErrorCode
from src.exceptions import NotFound


class PendingStudyNotFount(NotFound):
    DETAIL = ErrorCode.PENDING_STUDIES_NOT_FOUND
