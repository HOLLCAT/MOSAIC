from fastapi import FastAPI
from contextlib import asynccontextmanager
from config.config import initiate_database, shutdown_database
from routes.study import router as StudyRouter
from routes.user import router as UserRouter
from routes.admin import router as AdminRouter
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def db_lifespan(app: FastAPI):
    await initiate_database(app)
    yield
    await shutdown_database(app.state.mongodb_client)


app = FastAPI(lifespan=db_lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:5173",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app."}


app.include_router(StudyRouter, tags=["Study"], prefix="/study")
app.include_router(UserRouter, tags=["auth"], prefix="/auth")
app.include_router(AdminRouter, tags=["Admin"], prefix="/admin")
