import pytest
from src.files.schemas import FileType

def test_file_type_model_with_valid_data():
    # Use a valid UUID string
    file_data = {
        "file_name": "example.txt",
        "file_uuid": "123e4567-e89b-12d3-a456-426614174000"
    }
    file_type_instance = FileType(**file_data)
    assert file_type_instance.file_name == file_data["file_name"]
    assert file_type_instance.file_uuid == file_data["file_uuid"]