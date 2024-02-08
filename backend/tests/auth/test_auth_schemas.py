import pytest
from src.auth.schemas import RegisterRequest

def test_password_complexity_valid_password():
    # Testing a valid password
    valid_password = "ComplexPass123!"
    result = RegisterRequest.password_complexity(valid_password)
    assert result == valid_password  # No exception means the password is valid


def test_password_complexity_invalid_password():
    # Testing an invalid password (too short)
    invalid_password = "short"
    with pytest.raises(ValueError):
        RegisterRequest.password_complexity(invalid_password)
