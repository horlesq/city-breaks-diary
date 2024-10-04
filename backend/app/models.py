from pydantic import BaseModel
from typing import List, Optional

# Model for the location data
class Location(BaseModel):
    name: str  # Name of the location
    country: str  # Country where the location is
    emoji: str  # Emoji representing the country
    date: str  # Date of the visit
    notes: Optional[str] = None  # Notes about the trip
    position: dict  # Position containing latitude and longitude
    id: int  # Unique identifier for the location

# Model for a trip associated with a user
class Trip(BaseModel):
    user_id: str  # Identifier for the user
    locations: List[Location]  # List of locations visited in the trip

# Model for responses from the trips collection
class TripResponse(Trip):
    id: str  # Unique identifier for the trip document in the database

# Model for user login
class UserLogin(BaseModel):
    username: str  # Username of the user
    password: str  # Password of the user
