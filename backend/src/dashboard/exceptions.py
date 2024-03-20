from src.dashboard.constants import ErrorCode
from src.exceptions import NotFound, BadRequest, PermissionDenied


class PendingStudyNotFound(NotFound):
    DETAIL = ErrorCode.PENDING_STUDIES_NOT_FOUND


class CollaboratorAlreadyExists(BadRequest):
    DETAIL = ErrorCode.COLLABORATOR_ALREADY_EXISTS

class UserCannotAddCollaborator(PermissionDenied):
    DETAIL = ErrorCode.USER_CANNOT_ADD_COLLABORATOR

class CollaboratorNotFound(NotFound):
    DETAIL = ErrorCode.COLLABORATOR_NOT_FOUND

class UserCannotChangePhase(PermissionDenied):
    DETAIL = ErrorCode.USER_CANNOT_CHANGE_PHASE
    
class UserCannotRemoveCollaborator(PermissionDenied):
    DETAIL = ErrorCode.USER_CANNOT_REMOVE_COLLABORATOR
    
class UserCannotGetCollaborators(PermissionDenied):
    DETAIL = ErrorCode.USER_CANNOT_GET_COLLABORATORS
    
class UserCannotAddSelfAsCollaborator(BadRequest):
    DETAIL = ErrorCode.USER_CANNOT_ADD_SELF_AS_COLLABORATOR
    
class MessageDoesNotExist(NotFound):
    code = ErrorCode.MESSAGE_NOT_FOUND

class MessageCannotBeDeleted(PermissionDenied):
    code = ErrorCode.MESSAGE_CANNOT_BE_DELETED

class UserCannotPublishStudy(PermissionDenied):
    code = ErrorCode.USER_CANNOT_PUBLISH_STUDY

class PendingStudyCannotBePublished(BadRequest):
    code = ErrorCode.PENDING_STUDY_CANNOT_BE_PUBLISHED