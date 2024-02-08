import pytest
from unittest.mock import AsyncMock, patch
from src.auth import service


@pytest.mark.asyncio
@patch("src.auth.models.User")
async def test_create_user(MockUser):
    # Configure the mock user's create method
    mock_user_instance = MockUser.return_value
    mock_user_instance.create = AsyncMock(return_value=None)
    # Now calling User() returns a mock instance, so no database interaction occurs
    user = MockUser(
        email="newuser@example.com",
        name="New User",
        hashed_password="hashedpassword123",
    )
    await service.create_user(user)
    # Ensure the create method is called on the mock user instance
    mock_user_instance.create.assert_called_once()


@pytest.mark.asyncio
async def test_get_user_by_email_found():
    # Mock the user_collection's find_one method
    service.user_collection.find_one = AsyncMock(
        return_value={"email": "test@example.com", "id": "user123"}
    )
    user = await service.get_user_by_email("test@example.com")
    assert user is not None
    assert user["email"] == "test@example.com"


@pytest.mark.asyncio
async def test_get_user_by_email_not_found():
    service.user_collection.find_one = AsyncMock(return_value=None)
    user = await service.get_user_by_email("unknown@example.com")
    assert user is None
