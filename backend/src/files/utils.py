from pathlib import Path
from src.files.exceptions import (
    FileNotFound,
    MaxBodySizeValidator,
    MaxBodySizeException,
)
from streaming_form_data import StreamingFormDataParser
from streaming_form_data.targets import FileTarget
from streaming_form_data.validators import MaxSizeValidator
from starlette.requests import ClientDisconnect
from src.exceptions import BadRequest
from fastapi import Request
import os
from src.files import service
import uuid
from src.study.models import Study

MAX_FILE_SIZE = 1024 * 1024 * 1024 * 10  # 10GB
MAX_REQUEST_BODY_SIZE = MAX_FILE_SIZE + 1024
UPLOAD_DIR = "/var/www/data"


async def save_file(request: Request, study: Study, sample_id: str):
    file_uuid = str(uuid.uuid4())
    save_path = Path(UPLOAD_DIR)
    save_path.mkdir(parents=True, exist_ok=True)

    # Uses a unique  uuid to avoid temp processing issues
    temp_file_path = save_path / f"{file_uuid}.temp"

    body_validator = MaxBodySizeValidator(MAX_REQUEST_BODY_SIZE)
    parser = StreamingFormDataParser(headers=request.headers)
    file_target = FileTarget(
        str(temp_file_path), validator=MaxSizeValidator(MAX_FILE_SIZE)
    )
    parser.register("file", file_target)

    try:
        async for chunk in request.stream():
            body_validator(chunk)
            parser.data_received(chunk)
    except (ClientDisconnect, MaxBodySizeException) as e:
        # Ensures that the temporary file is removed if an exception occurs
        if temp_file_path.is_file():
            temp_file_path.unlink()
        raise BadRequest() from e

    final_file_path = (
        save_path / f"{file_uuid}{Path(file_target.multipart_filename).suffix}"
    )

    # Renames the temporary file to its final name
    temp_file_path.rename(final_file_path)

    # Updates the file metadata
    await service.store_file_metadata(
        study=study,
        file_name=file_target.multipart_filename,
        file_uuid=file_uuid,
        sample_id=sample_id,
    )


async def delete_file(study: Study, sample_id: str):

    file = await service.get_file_metadata(study, sample_id)
    file_uuid = file.file_uuid
    original_filename = file.file_name

    if file == None:
        raise FileNotFound()

    file_path = Path(UPLOAD_DIR) / f"{file_uuid}{Path(original_filename).suffix}"

    if not file_path.is_file():
        raise FileNotFound()

    file_path.unlink()

    await service.delete_file_metadata(study, sample_id)

    return {
        "message": f"Successfully deleted {original_filename} for sample {sample_id}"
    }


async def delete_study_files(study: Study):
    all_file_metadata = await service.get_all_files_metadata(study)

    for file_metadata in all_file_metadata:
        file_uuid = file_metadata["file_uuid"]
        file_name = file_metadata["file_name"]
        file_path = Path(UPLOAD_DIR) / f"{file_uuid}{Path(file_name).suffix}"

        if file_path.is_file():
            os.remove(file_path)
