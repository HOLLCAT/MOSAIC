from src.exceptions import DetailedHTTPException, PermissionDenied, NotFound, BadRequest, NotAuthenticated, ValidationError, ServerError
from fastapi import status

def test_detailed_http_exception():
    exception = DetailedHTTPException()
    assert exception.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR
    assert exception.detail == "Server error"

def test_permission_denied_exception():
    exception = PermissionDenied()
    assert exception.status_code == status.HTTP_403_FORBIDDEN
    assert exception.detail == "Permission denied"

def test_not_found_exception():
    exception = NotFound()
    assert exception.status_code == status.HTTP_404_NOT_FOUND
    assert exception.detail == "Server error"  

def test_bad_request_exception():
    exception = BadRequest()
    assert exception.status_code == status.HTTP_400_BAD_REQUEST
    assert exception.detail == "Bad Request"

def test_not_authenticated_exception():
    exception = NotAuthenticated()
    assert exception.status_code == status.HTTP_401_UNAUTHORIZED
    assert exception.detail == "User not authenticated"
    assert exception.headers == {"WWW-Authenticate": "Bearer"}

def test_validation_error_exception():
    detail = "Validation failed"
    exception = ValidationError(detail=detail)  
    assert exception.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    assert exception.detail == detail    
'''
TypeError: fastapi.exceptions.HTTPException.__init__() got multiple values for keyword argument 'detail'
'''

def test_server_error_exception():
    detail = "Internal server error"
    exception = ServerError(detail)
    assert exception.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR
    assert exception.detail == detail
