from fastapi import APIRouter, HTTPException
from .models import Trip, TripResponse, UserLogin
from .database import trip_collection
from typing import List

router = APIRouter()

# Create a new trip
@router.post("/trips/", response_model=TripResponse)
async def create_trip(trip: Trip):
    trip_data = trip.dict()
    new_trip = await trip_collection.insert_one(trip_data)
    
    # Fetch the created trip from the database
    created_trip = await trip_collection.find_one({"_id": new_trip.inserted_id})
    
    if created_trip is None:
        raise HTTPException(status_code=400, detail="Trip could not be created.")
    
    return TripResponse(**created_trip, id=str(created_trip["_id"]))

# Get all trips for a specific user
@router.get("/trips/{user_id}", response_model=List[TripResponse])
async def get_trips(user_id: str):
    trips = await trip_collection.find({"user_id": user_id}).to_list(1000)
    return [TripResponse(**trip, id=str(trip["_id"])) for trip in trips]

# Login functionality
@router.post("/login/")
async def login(user: UserLogin):
    # Placeholder for user authentication logic
    if user.username == "test" and user.password == "test":  # Example condition
        return {"message": "Login successful"}

@router.get("/")
async def root():
    return {"message": "Welcome to Map-My-Trip API"}