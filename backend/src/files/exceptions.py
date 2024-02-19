from src.files.constants import ErrorCode
from src.exceptions import NotFound, ValidationError, BadRequest, PermissionDenied

class InvalidFile(ValidationError):
    DETAIL = ErrorCode.INVALID_FILE_TYPE

class FileNotFound(NotFound):
    DETAIL = ErrorCode.FILE_NOT_FOUND
    
class SampleNotFound(BadRequest):
    DETAIL = ErrorCode.SAMPLE_NOT_FOUND

class FileExistsError(BadRequest):
    DETAIL = ErrorCode.FILE_EXISTS
    
class UserCannotUploadFile(PermissionDenied):
    DETAIL = ErrorCode.FILE_ACCESS_DENIED
    
class MaxBodySizeException(Exception):
    def __init__(self, body_len: int):
        super().__init__(f"Maximum request body size limit exceeded: {body_len} bytes")
        self.body_len = body_len

class MaxBodySizeValidator:
    def __init__(self, max_size: int):
        self.body_len = 0
        self.max_size = max_size

    def __call__(self, chunk: bytes):
        self.body_len += len(chunk)
        if self.body_len > self.max_size:
            raise MaxBodySizeException(body_len=self.body_len)
