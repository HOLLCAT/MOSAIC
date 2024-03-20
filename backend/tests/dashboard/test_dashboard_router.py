from typing import List
from pydantic import BaseModel
import pytest
from unittest.mock import patch, AsyncMock
from fastapi import FastAPI
from fastapi.testclient import TestClient
from src.dashboard.router import router as DashboardRouter
from src.auth.jwt import generate_jwt


class mockResponse(BaseModel):
    owner_id: str
    title: str
    description: str
    authors: List[str]
    accession_id: str
    created_date: str
    samples: List[str]
    isPublished: bool


SAMPLE_STUDY = {
    "title": "Example Study",
    "description": "Example Description",
    "accession_id": "DV_1A",
    "created_date": "11 February 2024",
    "authors": [],
    "samples": [],
    "owner_id": "sdkkld",
    "pending": "False",
    "isPublished": "False",
}

TEST_USER = {
    "email": "test@mail.com",
    "user_id": "user1",
    "role": "tester",
}

app = FastAPI()
app.include_router(DashboardRouter, tags=["Dashboard"], prefix="/dashboard")


# The fixture for the FastAPI test client
@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c


@pytest.mark.asyncio
async def test_get_study_dash(client):
    jwt_token = generate_jwt(
        TEST_USER["email"], TEST_USER["user_id"], TEST_USER["role"]
    )
    expected_study = mockResponse(**SAMPLE_STUDY)
    with patch(
        "src.dashboard.router.service.get_user_studies",
        new_callable=AsyncMock,
    ) as mock_get_user_studies, patch(
        "src.dashboard.router.service.get_collaborator_studies",
        new_callable=AsyncMock,
    ) as mock_get_collaborator_studies:

        mock_get_user_studies.return_value = [expected_study]
        mock_get_collaborator_studies.return_value = [expected_study]
        headers = {"Authorization": f"Bearer {jwt_token}"}
        response = client.get(f"/dashboard/studies", headers=headers)
        assert response.status_code == 200
