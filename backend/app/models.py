from pydantic import BaseModel
from typing import List, Dict, Optional

# Model for the location data
class City(BaseModel):
    cityName: str
    country: str
    emoji: str
    date: str
    notes: Optional[str] = None
    position: Dict[str, float] 
    id: int  # Unique identifier for the location

# Model for a trip associated with a user
class Trip(BaseModel):
    user_id: str
    cities: List[City]

# Model for responses from the trips collection
class TripResponse(Trip):
    id: str  # Unique identifier for the trip document in the database

# Model for user login
class UserLogin(BaseModel):
    username: str  # Username of the user
    password: str  # Password of the user
