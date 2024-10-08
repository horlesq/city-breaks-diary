from fastapi import APIRouter, HTTPException
from .models import Trip, TripResponse, UserLogin, City
from .database import trip_collection
from typing import List
from uuid import uuid4

router = APIRouter()

# Update the trip by adding cities to an existing user's trip
# Create a new trip if it doesn't exist
@router.post("/trips/")
async def add_or_create_trip(trip: Trip):
    # Convert the cities list into dictionaries
    trip_dict = trip.dict()
    
    # Try to find the user's trip document
    existing_trip = await trip_collection.find_one({"user_id": trip.user_id})

    if existing_trip:
        # If the trip exists, append the new cities to the existing cities array
        await trip_collection.update_one(
            {"user_id": trip.user_id},
            {"$push": {"cities": {"$each": trip_dict['cities']}}}  # Adds multiple cities
        )
        updated_trip = await trip_collection.find_one({"user_id": trip.user_id})
        return TripResponse(**updated_trip, id=str(updated_trip["_id"]))
    else:
        # If the trip does not exist, create a new trip
        trip_data = trip_dict  # Already converted to dict
        new_trip = await trip_collection.insert_one(trip_data)
        created_trip = await trip_collection.find_one({"_id": new_trip.inserted_id})
        return TripResponse(**created_trip, id=str(created_trip["_id"]))

# Get all trips for a specific user
@router.get("/trips/{user_id}", response_model=List[TripResponse])
async def get_trips(user_id: str):
    trips = await trip_collection.find({"user_id": user_id}).to_list(1000)
    return [TripResponse(**trip, id=str(trip["_id"])) for trip in trips]

# Get all cities for a specific user
@router.get("/trips/{user_id}/cities", response_model=List[City])
async def get_cities(user_id: str):
    trips = await trip_collection.find({"user_id": user_id}).to_list(1000)
    cities = []
    for trip in trips:
        cities.extend(trip.get("cities", []))  # Extract cities from each trip
    return cities

# Get a specific city by its ID for a specific user
@router.get("/trips/{user_id}/cities/{city_id}", response_model=City)
async def get_city(user_id: str, city_id: int):
    trips = await trip_collection.find({"user_id": user_id}).to_list(1000)
    for trip in trips:
        for city in trip.get("cities", []):
            if city["id"] == city_id:
                return city
    raise HTTPException(status_code=404, detail="City not found")

# Route to add a new city
@router.post("/trips/{user_id}/cities")
async def post_city(user_id: str, city: City):
    # Prepare the city data for insertion into MongoDB
    city_data = city.dict()
    
    # Check if the city with the same id already exists for the user
    existing_city = await trip_collection.find_one(
        {"user_id": user_id, "cities.id": city.id}
    )

    if existing_city:
        raise HTTPException(
            status_code=403, detail=f"City with id {city.id} already exists for this user."
        )
    
    # Do not set the _id field here; MongoDB will handle it automatically
    update_result = await trip_collection.update_one(
        {"user_id": user_id},
        {"$push": {"cities": city_data}}
    )

    if update_result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found or no cities added")

    return {"message": "City added successfully"}

# Login functionality
@router.post("/login/")
async def login(user: UserLogin):
    # Placeholder for user authentication logic
    if user.username == "test" and user.password == "test":  # Example condition
        return {"message": "Login successful"}

@router.get("/")
async def root():
    return {"message": "Welcome to Map-My-Trip API"}