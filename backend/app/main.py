from fastapi import FastAPI
from .routes import router as trip_router

app = FastAPI()

# Include the routes
app.include_router(trip_router)