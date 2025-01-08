from motor.motor_asyncio import AsyncIOMotorClient

MONGO_DETAILS = 

client = AsyncIOMotorClient(MONGO_DETAILS)
database = client["city-breaks-diary-db"]
trip_collection = database.get_collection("trips")
user_collection = database.get_collection("users")
