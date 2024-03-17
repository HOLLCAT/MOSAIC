import pytest
from unittest.mock import AsyncMock, MagicMock
from src.upload.schemas import FileType
from src.upload.service import (
    store_file_metadata,
    get_file_metadata,
    delete_file_metadata,
    get_all_files_metadata,
    is_all_files_uploaded,
    update_study_pending_status,
)

@pytest.fixture
def mock_study():
    # Create a Study mock object with basic fields
    study = MagicMock(
        owner_id="owner123",
        title="Study Title",
        description="Study Description",
        pending=True,
        samples=[],
        save=AsyncMock()
    )
    return study

@pytest.mark.asyncio
async def test_store_file_metadata(mock_study):
    sample_mock = MagicMock(Sample_ID="1", File=None)
    mock_study.samples.append(sample_mock)

    await store_file_metadata(mock_study, "test_file.txt", "uuid123", "1")

    assert sample_mock.File.file_name == "test_file.txt"
    assert sample_mock.File.file_uuid == "uuid123"
    mock_study.save.assert_called_once()

@pytest.mark.asyncio
async def test_get_file_metadata(mock_study):
    expected_file = FileType(file_name="test_file.txt", file_uuid="uuid123")
    mock_study.samples = [MagicMock(Sample_ID="1", File=expected_file)]

    file_metadata = await get_file_metadata(mock_study, "1")

    assert file_metadata.file_name == "test_file.txt"
    assert file_metadata.file_uuid == "uuid123"

@pytest.mark.asyncio
async def test_delete_file_metadata(mock_study):
    file = FileType(file_name="test_file.txt", file_uuid="uuid123")
    mock_study.samples = [MagicMock(Sample_ID="1", File=file)]

    await delete_file_metadata(mock_study, "1")

    assert mock_study.samples[0].File is None
    mock_study.save.assert_called_once()

@pytest.mark.asyncio
async def test_get_all_files_metadata():
    # Create simulation sample
    sample1 = MagicMock(Sample_ID="1")
    sample1.File = MagicMock(
        file_name="file1.txt", file_uuid="uuid1"
    )  # Sample with file

    sample2 = MagicMock(Sample_ID="2")
    sample2.File = None  # Explicitly specify samples without files

    sample3 = MagicMock(Sample_ID="3")
    sample3.File = MagicMock(file_name="file2.txt", file_uuid="uuid456")

    # Create a simulation Study object and set the samples attribute
    mock_study = MagicMock()
    mock_study.samples = [sample1, sample2, sample3]

    result = await get_all_files_metadata(mock_study)

    assert len(result) == 2  # Expect two samples of file metadata to be returned
    assert result[0]["file_name"] == "file1.txt"
    assert result[0]["file_uuid"] == "uuid1"
    assert result[1]["file_name"] == "file2.txt"
    assert result[1]["file_uuid"] == "uuid456"


@pytest.mark.asyncio
async def test_is_all_files_uploaded_all_uploaded(mock_study):
    file1 = FileType(file_name="test_file1.txt", file_uuid="uuid123")
    mock_study.samples = [MagicMock(Sample_ID="1", File=file1), MagicMock(Sample_ID="2", File=file1)]

    result = await is_all_files_uploaded(mock_study)

    assert result is True

@pytest.mark.asyncio
async def test_is_all_files_uploaded_not_all_uploaded(mock_study):
    file1 = FileType(file_name="test_file1.txt", file_uuid="uuid123")
    mock_study.samples = [MagicMock(Sample_ID="1", File=file1), MagicMock(Sample_ID="2", File=None)]

    result = await is_all_files_uploaded(mock_study)

    assert result is False

@pytest.mark.asyncio
async def test_update_study_pending_status(mock_study):
    await update_study_pending_status(mock_study)

    assert not mock_study.pending
    mock_study.save.assert_called_once()
