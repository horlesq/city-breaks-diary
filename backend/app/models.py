from pydantic import BaseModel,  EmailStr
from typing import List, Optional

# Model for User input validation
class User(BaseModel):
    email: EmailStr
    password: str

# Define the Position model
class Position(BaseModel):
    lat: float
    lng: float
    
# Model for the location data
class City(BaseModel):
    cityName: str
    country: str
    emoji: str
    date: str
    notes: Optional[str] = None
    position: Position 
    id: int  # Unique identifier for the location

# Model for a trip associated with a user
class Trip(BaseModel):
    user_id: str
    cities: List[City]

# Model for responses from the trips collection
class TripResponse(Trip):
    id: str  # Unique identifier for the trip document in the database