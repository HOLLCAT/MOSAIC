from src.auth.constants import ErrorCode
from src.exceptions import BadRequest, NotAuthenticated, PermissionDenied


class AuthRequired(NotAuthenticated):
    DETAIL = ErrorCode.AUTHENTICATION_REQUIRED


class AuthorizationFailed(PermissionDenied):
    DETAIL = ErrorCode.AUTHORIZATION_FAILED


class InvalidToken(NotAuthenticated):
    DETAIL = ErrorCode.INVALID_TOKEN


class InvalidCredentials(NotAuthenticated):
    DETAIL = ErrorCode.INVALID_CREDENTIALS

class EmailTaken(BadRequest):
    DETAIL = ErrorCode.EMAIL_TAKEN
    
class UserNotFound(BadRequest):
    DETAIL = ErrorCode.USER_NOT_FOUND
    
class UserCannotGetAuditMessages(PermissionDenied):
    DETAIL = ErrorCode.USER_CANNOT_GET_AUDIT_MESSAGES
    