from beanie import Document


class Counter(Document):
    _id: int
    assertion: str = None
    