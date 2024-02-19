from src.files.exceptions import *
from src.study.models import Study
from src.files.schemas import File


async def store_file_metadata(
    study: Study, file_name: str, file_uuid: str, sample_id: str
):
    file = File(file_name=file_name, file_uuid=file_uuid)
    for sample in study.samples:
        if str(sample.Sample_ID) == sample_id:
            sample.file = file
            break

    await study.save()


async def get_file_metadata(study: Study, sample_id: str) -> File:

    for sample in study.samples:
        if str(sample.Sample_ID) == sample_id:
            return sample.file

    raise SampleNotFound()


async def delete_file_metadata(study: Study, sample_id: str):

    for sample in study.samples:
        if str(sample.Sample_ID) == sample_id:
            sample.file = None
            break

    await study.save()


async def get_all_files_metadata(study: Study):

    file_metadata = []

    for sample in study.samples:
        if sample.file != None:
            file_metadata.append(
                {
                    # "sample_id": sample.Sample_ID,
                    "file_name": sample.file.file_name,
                    "file_uuid": sample.file.file_uuid,
                }
            )

    return file_metadata
