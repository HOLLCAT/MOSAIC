from fastapi import FastAPI, APIRouter
from typing import List
from pydantic import BaseModel
from pymongo import MongoClient
from pymongo.collection import Collection

# Defining the data model for an article.
# This model uses Pydantic for data validation.
class Article(BaseModel):
    title: str  # Title of the article
    author: str  # Author's name
    content: str  # Content of the article
    published_date: str  # Date when the article was published

# Database configuration - Ideally, these should be read from environment variables or config files
DB_HOST = 'localhost'  # Hostname for the database server
DB_PORT = 27017        # Port number for the database server
DB_NAME = 'test'       # Name of the database
DB_COLLECTION = 'test-collection'  # Name of the collection within the database

app = FastAPI()  # Creating an instance of the FastAPI application

# Creating a global MongoDB client instance for use across all requests.
# This avoids creating a new connection for each request.
client = MongoClient(host=DB_HOST, port=DB_PORT)
db = client[DB_NAME]
collection: Collection = db[DB_COLLECTION]

article = APIRouter(tags=['article part'])  # Creating a router for article-related endpoints

@app.on_event("startup")
async def startup_event():
    # This function will run at the start of the application.
    # It's useful for initializing resources like database connections.
    pass

@app.on_event("shutdown")
async def shutdown_event():
    # This function will run when the application is shutting down.
    # It's a good place to close resources like database connections.
    client.close()

@article.get("/article", summary="See articles list")
async def article_list():
    # Endpoint to retrieve a list of articles.
    # Finds all documents in the collection and excludes the MongoDB '_id' field.
    articles = list(collection.find({}, {'_id': 0}))
    return articles

@article.post("/article", summary="Add an article")
async def article_add(a1: Article):
    # Endpoint to add a new article.
    # Inserts the new article into the collection.
    collection.insert_one(a1.dict())
    return {"insertion": "done"}

@article.delete("/article", summary="Delete an article")
async def article_delete(a1: Article):
    # Endpoint to delete an article.
    # Deletes the article based on the provided data.
    result = collection.delete_one(a1.dict())
    if result.deleted_count:
        return {"deletion": "done"}
    return {"deletion": "not found"}

app.include_router(article)  # Including the article router in the main FastAPI app
