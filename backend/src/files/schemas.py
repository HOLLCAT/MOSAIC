from pydantic import BaseModel

class File(BaseModel):
    file_name: str
    file_uuid: str