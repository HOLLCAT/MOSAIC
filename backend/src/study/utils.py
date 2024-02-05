import csv
import io
import json
from typing import List, Dict, Any


class TextParser:
    def __init__(self, file):
        self.file = file
        self.__data = []
        self.__headers_detected = None
        self.__headers = []

    def read(self):
        self.file.seek(0)

        for line in self.file:
            self.__process_line(line.decode("utf-8"))

        return self.__data

    def __process_line(self, line):
        record = {}
        if self.__headers_detected == None:
            self.__detect_headers(line)
            if self.__headers_detected == False:
                self.__process_record(line, record)
        else:
            self.__process_record(line, record)
        if record:
            self.__data.append(record)

    def __detect_headers(self, line):
        if ":" in line and "," in line:
            self.__headers_detected = False
        elif "\t" in line:
            self.__headers = line.strip().split("\t")
            self.__headers_detected = True
        elif "|" in line:
            self.__headers = line.strip().split("|")
            self.__headers_detected = True
        else:  # Space-delimited or other format
            self.__headers = line.strip().split()
            self.__headers_detected = True

    def __process_record(self, line, record):
        if ":" in line and "," in line:
            self.__process_key_value_pairs(line, record)
        elif "    " in line:
            self.__process_values(line, record, "   ")
        elif "|" in line:
            self.__process_values(line, record, "|")
        else:
            self.__process_values(line, record)

    def __process_key_value_pairs(self, line, record):
        pairs = line.strip().split(", ")
        for pair in pairs:
            if ":" in pair:
                key, value = pair.split(":")
                record[key.strip()] = value.strip()

    def __process_values(self, line, record, delimiter=" "):
        values = line.strip().split(delimiter)
        for i, value in enumerate(values):
            if i < len(self.__headers):
                record[self.__headers[i]] = value


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
            "Biomaterial_Provider",
            "Date_Sample_Prep",
            "Biological_Repeat",
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
            if "fastq" in entry:
                del entry["fastq"]
            entry = {key.replace(" ", "_"): value for key, value in entry.items()}

            extracted_entry = {field: entry.get(field, "") for field in required_fields}

            for key, value in entry.items():
                if key not in required_fields and key and value:
                    extracted_entry[key] = value

            extracted_data.append(extracted_entry)
        return extracted_data
