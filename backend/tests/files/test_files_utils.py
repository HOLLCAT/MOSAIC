import pytest
from unittest.mock import patch, MagicMock, AsyncMock
from src.files.utils import save_file, delete_file, delete_study_files
from src.files.exceptions import FileNotFound
from src.study.models import Study
from src.study.schemas import Sample 
from datetime import datetime
from src.files.exceptions import FileNotFound


@pytest.fixture
def mock_sample():
    return Sample(
        Sample="DV_1A_1",
        Sample_ID="1A_1",
        SampleGroup="Group_1",
        Sample_Project="sample_project_1",
        Description="Human Sample",
        Organism="Homo sapiens",
        Tissue="Liver",
        Sex="Female",
        Cell_Line="HeLa",
        Mouse_Model="Model_1",
        Biomaterial_Provider="Provider A",
        Date_Sample_Prep="2022-01-01",
        Biological_Repeat="1",
    )

@pytest.fixture
def mock_study():
    study = MagicMock(spec=Study)
    study.owner_id = "some-owner-id"
    study.title = "Mock Study Title"
    study.description = "Mock Study Description"
    study.authors = ["Author 1", "Author 2"]
    study.samples = [{"Sample": "DV_1A_1"}] 
    study.pending = True
    study.created_date = datetime.now().strftime("%Y-%m-%d")
    return study

@pytest.mark.asyncio
@patch("src.files.utils.service.store_file_metadata", AsyncMock())
async def test_save_file_success(mock_study, tmp_path):
    boundary = 'boundary'
    content_type = f'multipart/form-data; boundary={boundary}'
    headers = {'Content-Type': content_type}
    # Construct multi-part form data
    parts = [
        f'--{boundary}',
        'Content-Disposition: form-data; name="file"; filename="test.txt"',
        'Content-Type: text/plain',
        '',
        'This is the content of the file.',
        f'--{boundary}--',
        ''
    ]
    body = '\r\n'.join(parts).encode('utf-8')

    # Use a custom asynchronous generator to simulate request.stream()
    async def mock_stream():
        yield body

    mock_request = MagicMock()
    mock_request.stream = mock_stream
    mock_request.headers = headers

    with patch('src.files.utils.UPLOAD_DIR', str(tmp_path)):
        await save_file(mock_request, mock_study, 'sample_id')
    # Check if the file is saved
    assert any(tmp_path.iterdir()), "File should be saved"


@pytest.mark.asyncio
@patch("src.files.utils.service.get_file_metadata", AsyncMock(return_value=MagicMock(file_uuid='uuid', file_name='file.txt')))
@patch("src.files.utils.service.delete_file_metadata", AsyncMock())
async def test_delete_file_success(mock_study, tmp_path):
    # Use tmp_path to simulate the path of file storage and create a simulation file
    file_path = tmp_path / 'uuid.txt'
    file_path.touch()

    with patch('src.files.utils.UPLOAD_DIR', str(tmp_path)):
        await delete_file(mock_study, 'sample_id')

    # Check if the file has been deleted
    assert not file_path.exists(), "File should be deleted"


@pytest.mark.asyncio
@patch("src.files.utils.service.get_file_metadata", AsyncMock(side_effect=FileNotFound))
@patch("src.files.utils.service.get_file_metadata", AsyncMock(return_value=None))
async def test_delete_file_not_found(mock_study):
    # Test deletion of non-existent files
    with pytest.raises(FileNotFound):
        await delete_file(mock_study, 'sample_id')

@pytest.mark.asyncio
@patch("src.files.utils.service.get_all_files_metadata", AsyncMock(return_value=[]))
async def test_delete_study_files():
    mock_study = MagicMock(samples=[])

    await delete_study_files(mock_study)

