from fastapi import APIRouter
from typing import List
from pymongo import MongoClient
from pydantic import BaseModel
class Article(BaseModel):
    title: str
    author: str
    # more to be added


article = APIRouter(tags=['article part'])

@article.get("/article", summary="see articles list")
async def article_list(t:str):
    client = MongoClient(host='localhost',port=27017)
    db = client['test']
    db['test-collection'].find()
    return {"its": "done"}
# Watch out! This is not completely done!
# Later it can be edited to return the result searched by a lot of filters but now
# it will just find all documents in this collection and return its done

@article.post("/article", summary="add articles")
async def article_add(a1:Article):
    client = MongoClient(host='localhost',port=27017)
    db = client['test']
    db['test-collection'].insert_one(a1.dict())
    return {"insertion":"done"}
# By run this, you can add an article in to the collection with correct format.
# you can edit the class Article in article.py to change it. Now it only has title and author
# update it to recieve document is possible but for now I want to keep it simple


@article.delete("/article", summary="delete articles")
async def article_delete(a1:Article):
    client = MongoClient(host='localhost',port=27017)
    db = client['test']
    db['test-collection'].delete_one(a1.dict())
# this one is used to delete the articles