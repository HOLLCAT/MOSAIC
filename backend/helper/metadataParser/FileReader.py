import csv
import io
import json
from typing import List, Dict, Any
from .TextParser import TextParser


class FileReader:
    def __init__(self, file, file_type):
        self.file = file
        self.file_type = file_type
        self.fields = [
            "Sample_ID",
            "SampleGroup",
            "Description",
            "Organism",
            "Tissue",
            "Sex",
            "Cell_Line",
            "Mouse_Model",
            "Biomaterial Provider",
            "Date_Sample_Prep",
            "Biological Repeat",
            "fastq",
        ]

    def __read_file(self):
        if self.file_type == "csv":
            return self.__read_csv()
        elif self.file_type == "txt":
            return self.__read_txt()
        elif self.file_type == "json":
            return self.__read_json()
        else:
            raise ValueError("Unsupported file type")

    def __read_csv(self):
        self.file.seek(0)
        file_content = self.file.read()

        string_content = file_content.decode("utf-8")
        text_stream = io.StringIO(string_content)

        reader = csv.DictReader(text_stream)
        return [row for row in reader]

    def __read_json(self):
        self.file.seek(0)
        return json.load(self.file)

    def __read_txt(self):
        return TextParser(self.file).read()

    def process_file(self) -> List[Dict[str, Any]]:
        data = self.__read_file()
        return self.__extract_fields(data, self.fields)

    def __extract_fields(self, data, required_fields):
        extracted_data = []
        for entry in data:
            extracted_entry = {field: entry.get(field, "") for field in required_fields}

            for key, value in entry.items():
                if key not in required_fields and key and value:
                    extracted_entry[key] = value

            extracted_data.append(extracted_entry)
        return extracted_data
