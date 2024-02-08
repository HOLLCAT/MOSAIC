from fastapi.testclient import TestClient
from fastapi import FastAPI
from unittest.mock import patch, MagicMock
import pytest
from src.auth.router import router as AuthRouter

app = FastAPI()
app.include_router(AuthRouter, tags=["Auth"])

@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c

@pytest.mark.asyncio
async def test_login_for_openapi_return_200_when_success(client):

    user_mock = MagicMock()
    user_mock.email = "test@example.com"
    user_mock.id = "user_id"
    user_mock.role = "user"
    user_mock.hashed_password = "hashed_password"
    user_mock.name = "Alex"  

    with patch('src.auth.service.get_user_by_email', return_value=user_mock), \
         patch('src.auth.utils.verify_password', return_value=True):

        response = client.post("/token", data={"username": "test@example.com", "password": "password"})
        
        assert response.status_code == 200
        assert response.json()["email"] == "test@example.com"


@pytest.mark.asyncio
async def test_login_for_openapi_return_401_when_user_not_found(client):
    with patch('src.auth.service.get_user_by_email', return_value=None):
        response = client.post("/token", data={"username": "nonexistent@example.com", "password": "password"})
        
        assert response.status_code == 401
        assert response.json()["detail"] == "Invalid credentials."

@pytest.mark.asyncio
async def test_login_for_openapi_return_401_when_invalid_password(client):
    user_mock = MagicMock()
    user_mock.email = "test@example.com"
    user_mock.id = "user_id"
    user_mock.role = "user"
    user_mock.hashed_password = "hashed_password"
    
    with patch('src.auth.service.get_user_by_email', return_value=user_mock), \
         patch('src.auth.utils.verify_password', return_value=False):
        
        response = client.post("/token", data={"username": "test@example.com", "password": "wrongpassword"})
        
        assert response.status_code == 401
        assert response.json()["detail"] == "Invalid credentials."
