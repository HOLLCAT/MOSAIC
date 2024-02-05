from src.logging import logger
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware


class LogMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request: Request, call_next):
        try:
            response = await call_next(request)
            if response.status_code == 500:
                logger.error(f"{request.method}|{request.url}|{response.body.decode()}")
            else:
                logger.info(f"{request.method}|{request.url}")
            return response
        except Exception as e:
            logger.error(f"{request.method}|{request.url}|{e}")
            raise e
