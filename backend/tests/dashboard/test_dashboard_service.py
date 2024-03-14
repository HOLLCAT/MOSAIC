import pytest
from unittest.mock import AsyncMock, patch
from src.dashboard.service import get_user_studies, get_user_pending_studies

@pytest.mark.asyncio
@patch("src.dashboard.service.study_collection")
async def test_get_user_studies(mock_study_collection):
    # Simulate the return value of study_collection.find().to_list()
    mock_study_collection.find.return_value.find.return_value.to_list = AsyncMock(return_value=["study1", "study2"])
    
    # Call the function and verify the result
    studies = await get_user_studies("owner123")
    assert len(studies) == 2
    assert studies[0] == "study1"
    assert studies[1] == "study2"
    # Make sure you pass the correct query parameters
    mock_study_collection.find.assert_called_with({"owner_id": "owner123"})
    mock_study_collection.find.return_value.find.assert_called_with({"pending": False})

@pytest.mark.asyncio
@patch("src.dashboard.service.study_collection")
async def test_get_user_pending_studies(mock_study_collection):
    # Simulate the return value of study_collection.find().to_list()
    mock_study_collection.find.return_value.find.return_value.to_list = AsyncMock(return_value=["pending_study1", "pending_study2"])
    
    # Call the function and verify the result
    pending_studies = await get_user_pending_studies("owner123")
    assert len(pending_studies) == 2
    assert pending_studies[0] == "pending_study1"
    assert pending_studies[1] == "pending_study2"
    # Make sure you pass the correct query parameters
    mock_study_collection.find.assert_called_with({"owner_id": "owner123"})
    mock_study_collection.find.return_value.find.assert_called_with({"pending": True})
