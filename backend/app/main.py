from fastapi import FastAPI
from .routes import router as trip_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Include the routes
app.include_router(trip_router)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow your frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)