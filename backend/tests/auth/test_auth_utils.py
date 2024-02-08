from src.auth import utils
import pytest


@pytest.fixture
def user_details():
    return {"user_id": 123, "email": "user@example.com", "password": "securepassword"}


def test_hash_password(user_details):
    hashed_password = utils.hash_password(user_details["password"])
    assert utils.verify_password(user_details["password"], hashed_password) is True


def test_verify_password_with_correct_password(user_details):
    # Authentication for matching passwords works fine
    plain_password = user_details["password"]
    hashed_password = utils.hash_password(plain_password)
    assert utils.verify_password(plain_password, hashed_password) is True


def test_verify_password_with_incorrect_password(user_details):
    # Mismatching password, verification failed
    plain_password = user_details["password"]
    hashed_password = utils.hash_password(plain_password)
    assert utils.verify_password("wrongpassword", hashed_password) is False
