from src.study.constants import ErrorCode
from src.exceptions import BadRequest, PermissionDenied, ValidationError, NotFound


class UserCannotDeleteStudy(PermissionDenied):
    DETAIL = ErrorCode.STUDY_CANNOT_BE_DELETED


class UserCannotUpdateStudy(PermissionDenied):
    DETAIL = ErrorCode.STUDY_CANNOT_BE_UPDATED


class StudyNotFound(NotFound):
    DETAIL = ErrorCode.STUDY_NOT_FOUND


class TitleMissing(BadRequest):
    DETAIL = ErrorCode.TITLE_MISSING


class InvalidSamples(ValidationError):
    pass
