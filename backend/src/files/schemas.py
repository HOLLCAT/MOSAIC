from pydantic import BaseModel

class FileType(BaseModel):
    file_name: str
    file_uuid: str