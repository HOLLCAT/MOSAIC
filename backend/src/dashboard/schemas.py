from pydantic import model_validator
from typing import List

from src.study.schemas import BaseSample, BaseStudy


class SampleResponse(BaseSample):

    @model_validator(mode="before")
    def has_file(cls, values):
        if "File" in values and values["File"] is not None:
            values["File"] = True
        else:
            values["File"] = False
        return values


class StudyResponse(BaseStudy):
    accession_id: str
    created_date: str
    samples: List[SampleResponse]
