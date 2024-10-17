from motor.motor_asyncio import AsyncIOMotorClient

MONGO_DETAILS = "mongodb+srv://horlesq:horlesqAdmin@cluster0.dwa7h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = AsyncIOMotorClient(MONGO_DETAILS)
database = client["city-breaks-diary-db"]
trip_collection = database.get_collection("trips")
user_collection = database.get_collection("users")
