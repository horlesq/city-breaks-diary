from fastapi import APIRouter, HTTPException
from .models import Trip, TripResponse, City, User
from .database import trip_collection, user_collection
from typing import List
from uuid import uuid4
from passlib.context import CryptContext

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Helper function to verify passwords
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Create a new user if it doesn't exist
@router.post("/user/register")
async def register_user(user: User):
    # Check if user already exists
    existing_user = await user_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists.")
    
    # Hash the password
    hashed_password = pwd_context.hash(user.password)
    
    # Store the user in the database
    user_data = {"email": user.email, "password": hashed_password}
    await user_collection.insert_one(user_data)

    return user

#
@router.post("/user/login")
async def login_user(user: User):
    # Check if the user exists in the database
    existing_user = await user_collection.find_one({"email": user.email})
    if not existing_user:
        raise HTTPException(status_code=400, detail="No account for this email.")

    # Verify the provided password against the hashed password
    if not verify_password(user.password, existing_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid password.")

    # Optionally, create a token (JWT) and return it
    # For simplicity, return a success message for now
    return user


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


# Route to add a new city for user
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


# Route to delete a city for user
@router.delete("/trips/{user_id}/cities/{city_id}")
async def delete_city(user_id: str, city_id: int):
    # Find the user document
    user_document = await trip_collection.find_one({"user_id": user_id})

    if not user_document:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the city exists in the user's cities
    existing_city = next((city for city in user_document.get("cities", []) if city["id"] == city_id), None)

    if not existing_city:
        raise HTTPException(status_code=404, detail="City not found")

    # Remove the city from the user's cities
    update_result = await trip_collection.update_one(
        {"user_id": user_id},
        {"$pull": {"cities": {"id": city_id}}}
    )

    if update_result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Failed to delete city")

    return {"message": "City deleted successfully"}


@router.get("/")
async def root():
    return {"message": "Welcome to Map-My-Trip API"}