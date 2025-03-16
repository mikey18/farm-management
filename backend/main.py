from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, Column, Integer, String, Float, Date
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from datetime import date
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import random


# Database Configuration
DATABASE_URL = "sqlite:///./farm_management.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Models
class Machinery(Base):
    __tablename__ = "machinery"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String, index=True)
    status = Column(String, default="Operational")


class Livestock(Base):
    __tablename__ = "livestock"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, index=True)
    count = Column(Integer)
    birth_date = Column(Date)


class Crop(Base):
    __tablename__ = "crops"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    planting_date = Column(Date)
    harvesting_date = Column(Date)


class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)
    amount = Column(Float)
    date = Column(Date, default=date.today)

# Create Tables
Base.metadata.create_all(bind=engine)

# FastAPI App
app = FastAPI()

# cors
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# cors


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()




class FarmParameters(BaseModel):
    soilType: str
    pH: float
    rainfall: str  # Expected values: "low", "moderate", "high"
    temperature: str  # e.g., "cool", "warm", "hot"
    season: str  # e.g., "dry", "rainy"

# Expanded crop database with optimal conditions and additional attributes
CROP_DATA = [
    {
        "name": "Cassava",
        "baseScore": 85,
        "optimalSoil": ["loamy", "sandy"],
        "pHRange": (5.5, 7.5),
        "waterRequirement": "Moderate",
        "temperaturePreference": "warm",
        "seasonPreference": "rainy",
        "estimatedYield": "12-15 tons/hectare",
        "growingPeriod": "10-12 months",
        "profitPotential": "High"
    },
    {
        "name": "Yam",
        "baseScore": 80,
        "optimalSoil": ["loamy"],
        "pHRange": (5.5, 7.0),
        "waterRequirement": "Moderate to High",
        "temperaturePreference": "warm",
        "seasonPreference": "rainy",
        "estimatedYield": "8-10 tons/hectare",
        "growingPeriod": "6-8 months",
        "profitPotential": "Very High"
    },
    {
        "name": "Corn",
        "baseScore": 75,
        "optimalSoil": ["loamy", "clay"],
        "pHRange": (5.8, 7.5),
        "waterRequirement": "Moderate",
        "temperaturePreference": "warm",
        "seasonPreference": "rainy",
        "estimatedYield": "5-7 tons/hectare",
        "growingPeriod": "3-4 months",
        "profitPotential": "Medium"
    },
    {
        "name": "Beans",
        "baseScore": 70,
        "optimalSoil": ["sandy", "loamy"],
        "pHRange": (6.0, 7.5),
        "waterRequirement": "Low to Moderate",
        "temperaturePreference": "cool",
        "seasonPreference": "dry",
        "estimatedYield": "1.5-2 tons/hectare",
        "growingPeriod": "2-3 months",
        "profitPotential": "Medium"
    },
    {
        "name": "Rice",
        "baseScore": 90,
        "optimalSoil": ["clay", "loamy"],
        "pHRange": (5.0, 6.5),
        "waterRequirement": "High",
        "temperaturePreference": "warm",
        "seasonPreference": "rainy",
        "estimatedYield": "4-10 tons/hectare",
        "growingPeriod": "3-5 months",
        "profitPotential": "Very High"
    },
    {
        "name": "Sorghum",
        "baseScore": 65,
        "optimalSoil": ["sandy", "loamy"],
        "pHRange": (5.5, 7.5),
        "waterRequirement": "Low",
        "temperaturePreference": "warm",
        "seasonPreference": "dry",
        "estimatedYield": "2-5 tons/hectare",
        "growingPeriod": "4-6 months",
        "profitPotential": "Medium"
    },
    {
        "name": "Millet",
        "baseScore": 60,
        "optimalSoil": ["sandy"],
        "pHRange": (5.5, 7.5),
        "waterRequirement": "Low",
        "temperaturePreference": "warm",
        "seasonPreference": "dry",
        "estimatedYield": "2-3 tons/hectare",
        "growingPeriod": "3-5 months",
        "profitPotential": "Medium"
    },
    {
        "name": "Wheat",
        "baseScore": 70,
        "optimalSoil": ["loamy", "clay"],
        "pHRange": (6.0, 7.0),
        "waterRequirement": "Moderate",
        "temperaturePreference": "cool",
        "seasonPreference": "dry",
        "estimatedYield": "2.5-4 tons/hectare",
        "growingPeriod": "4-5 months",
        "profitPotential": "High"
    },
    {
        "name": "Tomato",
        "baseScore": 80,
        "optimalSoil": ["loamy", "sandy"],
        "pHRange": (6.0, 7.0),
        "waterRequirement": "Moderate",
        "temperaturePreference": "warm",
        "seasonPreference": "dry",
        "estimatedYield": "20-30 tons/hectare",
        "growingPeriod": "3-4 months",
        "profitPotential": "Very High"
    },
    {
        "name": "Cocoa",
        "baseScore": 85,
        "optimalSoil": ["loamy", "clay"],
        "pHRange": (5.0, 6.5),
        "waterRequirement": "High",
        "temperaturePreference": "warm",
        "seasonPreference": "rainy",
        "estimatedYield": "1.5-2 tons/hectare",
        "growingPeriod": "3-5 years",
        "profitPotential": "Very High"
    },
]

@app.post("/predict/", response_model=List[dict])
def predict_crop(parameters: FarmParameters):
    recommendations = []
    
    for crop in CROP_DATA:
        score = crop["baseScore"]

        # Bonus for matching optimal soil type
        if parameters.soilType.lower() in [s.lower() for s in crop["optimalSoil"]]:
            score += 10
        else:
            score -= 5  # Penalty for non-optimal soil

        # pH bonus/penalty
        if crop["pHRange"][0] <= parameters.pH <= crop["pHRange"][1]:
            score += 8
        else:
            score -= 7

        # Rainfall adjustment
        if parameters.rainfall.lower() == "moderate" and crop["waterRequirement"].lower() in ["moderate", "moderate to high"]:
            score += 6
        elif parameters.rainfall.lower() == "high" and "high" in crop["waterRequirement"].lower():
            score += 10
        elif parameters.rainfall.lower() == "low" and "low" in crop["waterRequirement"].lower():
            score += 8
        else:
            score -= 6

        # Temperature bonus
        if parameters.temperature.lower() == crop["temperaturePreference"].lower():
            score += 5

        # Season bonus/penalty
        if parameters.season.lower() == crop["seasonPreference"].lower():
            score += 5
        else:
            score -= 3

        # Introduce a small randomness factor to simulate uncertainty (± up to 2 points)
        score += random.randint(-2, 2)
        
        # Ensure score stays within 0-100 range
        adjusted_score = max(0, min(100, score))

        # Return only the required keys in the desired format
        recommendations.append({
            "name": crop["name"],
            "score": adjusted_score,
            "estimatedYield": crop["estimatedYield"],
            "growingPeriod": crop["growingPeriod"],
            "waterRequirement": crop["waterRequirement"],
            "profitPotential": crop["profitPotential"],
        })

    # Sort recommendations by score in descending order
    recommendations.sort(key=lambda x: x["score"], reverse=True)
    return recommendations

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
