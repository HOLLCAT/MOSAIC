import pytest
from jose import jwt
from src.auth import jwt as my_jwt_module
from src.auth.config import jwt_settings


def test_generate_jwt_returns_valid_token():
    # Simulate jwt_settings
    jwt_settings.SECRET_KEY = "test_secret_key"
    jwt_settings.ALGORITHM = "HS256"
    jwt_settings.ACCESS_TOKEN_EXPIRE_MINUTES = 60

    email = "test@example.com"
    user_id = "123"
    role = "user"

    token = my_jwt_module.generate_jwt(email, user_id, role)
    payload = jwt.decode(
        token, jwt_settings.SECRET_KEY, algorithms=[jwt_settings.ALGORITHM]
    )

    assert payload["sub"] == user_id
    assert payload["email"] == email
    assert payload["role"] == role
    # Make sure the token has the correct expiration time
    assert "exp" in payload


def test_parse_jwt_returns_valid_token_data():
    # Generate a valid JWT token
    token = my_jwt_module.generate_jwt("test@example.com", "123", "user")
    # Parse token
    token_data = my_jwt_module.parse_jwt(token)
    assert token_data.email == "test@example.com"
    assert token_data.id == "123"


# Test the handling of invalid tokens
def test_parse_jwt_returns_valid_token_data():
    with pytest.raises(my_jwt_module.InvalidToken):
        my_jwt_module.parse_jwt("invalid_token")
