import pytest
import io
from src.study.utils import FileReader
from src.study.schemas import Sample


fields = [
    "Sample_ID",
    "SampleGroup",
    "Description",
    "Organism",
    "Tissue",
    "Sex",
    "Cell_Line",
    "Mouse_Model",
    "Biomaterial_Provider",
    "Date_Sample_Prep",
    "Biological_Repeat",
]


def test_should_return_samples_from_csv():
    csv_content = (
        "Sample,Sample_ID,Sample_Project,SampleGroup,Description,New_Field"
        + "\nD2_V1,V1,MOSAIC-0001,Group1,Description1,new_value1"
        + "\nD2_V,V2,MOSAIC-0001,Group2,Description2,new_value2"
    )
    file = io.BytesIO(csv_content.encode())
    reader = FileReader(file, "csv")
    result = reader.process_file()
    samples = [Sample(**sample) for sample in result]

    assert all(field in result[0].keys() for field in fields)

    assert samples[0].Sample == "D2_V1"
    assert samples[1].Sample_ID == "V2"
    assert samples[1].Tissue == ""

    assert samples[0].model_dump().get("New_Field") == "new_value1"


def test_should_return_samples_from_json():
    json_content = '[{"Sample": "D2_V1", "Sample_ID": "V1", "Sample_Project": "MOSAIC-0001", "SampleGroup": "Group1", "Description": "Description1", "New_Field": "new_value1"}, {"Sample": "D2_V", "Sample_ID": "V2", "Sample_Project": "MOSAIC-0001", "SampleGroup": "Group2", "Description": "Description2", "New_Field": "new_value2"}]'
    file = io.StringIO(json_content)
    reader = FileReader(file, "json")
    result = reader.process_file()

    samples = [Sample(**sample) for sample in result]

    assert all(field in result[0].keys() for field in fields)

    assert samples[0].Sample == "D2_V1"
    assert samples[1].Sample_ID == "V2"
    assert samples[1].Tissue == ""

    assert samples[0].model_dump().get("New_Field") == "new_value1"


def test_should_return_samples_from_tab_separated_txt():
    txt_content = (
        "Sample    Sample_ID    Sample_Project    SampleGroup    Description"
        + "\nD2_V1    V1   MOSAIC-0001   Group1   Description value"
        + "\nD2_V2    V2   MOSAIC-0001   Group2   Description2"
    )
    file = io.BytesIO(txt_content.encode())
    reader = FileReader(file, "txt")
    result = reader.process_file()
    samples = [Sample(**sample) for sample in result]

    assert all(field in result[0].keys() for field in fields)

    assert samples[0].Sample == "D2_V1"
    assert samples[1].Sample_Project == "MOSAIC-0001"
    assert samples[1].Tissue == ""


def test_should_return_samples_from_pipe_separated_txt():
    txt_content = (
        "Sample|Sample_ID|Sample_Project|SampleGroup|Description"
        + "\nD2_V1|V1|MOSAIC-0001|Group1|Description value"
        + "\nD2_V2|V2|MOSAIC-0001|Group2|Description2"
    )
    file = io.BytesIO(txt_content.encode())
    reader = FileReader(file, "txt")
    result = reader.process_file()
    samples = [Sample(**sample) for sample in result]

    assert all(field in result[0].keys() for field in fields)

    assert samples[0].Sample == "D2_V1"
    assert samples[1].Sample_Project == "MOSAIC-0001"
    assert samples[1].Tissue == ""


def test_should_return_samples_from_key_value_txt():
    txt_content = (
        "Sample: D2_V1, Sample_ID: V1, Sample_Project: MOSAIC-0001, SampleGroup: Group1, Description: Description value"
        + "\nSample: D2_V2, Sample_ID: V2, Sample_Project: MOSAIC-0001, SampleGroup: Group2, Description: Description2"
    )
    file = io.BytesIO(txt_content.encode())
    reader = FileReader(file, "txt")
    result = reader.process_file()
    samples = [Sample(**sample) for sample in result]

    assert all(field in result[0].keys() for field in fields)

    assert samples[0].Sample == "D2_V1"
    assert samples[1].Sample_Project == "MOSAIC-0001"
    assert samples[1].Tissue == ""


def test_should_raise_error_for_unsupported_file_type():
    file = io.StringIO("")
    reader = FileReader(file, "unsupported")
    with pytest.raises(ValueError):
        reader.process_file()
