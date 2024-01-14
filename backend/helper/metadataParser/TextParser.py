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
