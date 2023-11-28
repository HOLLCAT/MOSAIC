from pymongo import MongoClient


DB_HOST = 'localhost'
DB_PORT = 27017
DB_NAME = 'User Info'

client = MongoClient(DB_HOST, DB_PORT)
db = client[DB_NAME]


def get_user_by_email(email: str):
    return db.users.find_one({"email": email})

def add_user(full_name: str, email: str, hashed_password: str):
    return db.users.insert_one({
        "full_name": full_name,
        "email": email,
        "hashed_password": hashed_password
    })

def delete_user(email: str):
    return db.users.delete_one({"email": email}).deleted_count > 0

client = MongoClient("mongodb://localhost:27017/User Info")
