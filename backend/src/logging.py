import logging
import sys


LOG_FORMAT_DEBUG = (
    "%(levelname)s|%(asctime)s|%(message)s"
)

logger = logging.getLogger(__name__)
formatter = logging.Formatter(LOG_FORMAT_DEBUG)

stream_handler = logging.StreamHandler(sys.stdout)
file_handler = logging.FileHandler("app.log")

stream_handler.setFormatter(formatter)
file_handler.setFormatter(formatter)

logger.handlers = [stream_handler, file_handler]
logger.setLevel(logging.INFO)
