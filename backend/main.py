from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from datetime import date
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

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


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Machinery Endpoints
@app.post("/machinery/")
def add_machinery(name: str, category: str, db: Session = Depends(get_db)):
    machinery = Machinery(name=name, category=category)
    db.add(machinery)
    db.commit()
    db.refresh(machinery)
    return machinery


@app.get("/machinery/")
async def get_machinery(db: Session = Depends(get_db)):
    # return db.query(Machinery).all()
    return {}


# Livestock Endpoints
@app.post("/livestock/")
def add_livestock(
    type: str, count: int, birth_date: date, db: Session = Depends(get_db)
):
    livestock = Livestock(type=type, count=count, birth_date=birth_date)
    db.add(livestock)
    db.commit()
    db.refresh(livestock)
    return livestock


@app.get("/livestock/")
def get_livestock(db: Session = Depends(get_db)):
    return db.query(Livestock).all()


# Crop Endpoints
@app.post("/crops/")
def add_crop(
    name: str, planting_date: date, harvesting_date: date, db: Session = Depends(get_db)
):
    crop = Crop(name=name, planting_date=planting_date, harvesting_date=harvesting_date)
    db.add(crop)
    db.commit()
    db.refresh(crop)
    return crop


@app.get("/crops/")
def get_crops(db: Session = Depends(get_db)):
    return db.query(Crop).all()


# Financial Transactions Endpoints
@app.post("/transactions/")
def add_transaction(type: str, amount: float, db: Session = Depends(get_db)):
    transaction = Transaction(type=type, amount=amount)
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return transaction


@app.get("/transactions/")
def get_transactions(db: Session = Depends(get_db)):
    return db.query(Transaction).all()


# Machine Learning Component (Simple Crop Prediction Placeholder)
@app.get("/predict-crop/")
def predict_crop(soil_ph: float, rainfall: float, temperature: float):
    # Dummy training data (Normally, you'd load real historical data)
    X_train = np.array([[6.5, 200, 25], [5.8, 150, 22], [7.0, 180, 24]])
    y_train = np.array(["Yam", "Corn", "Cassava"])

    # Simple ML Model (Linear Regression with categorical output handling)
    model = LinearRegression()
    model.fit(X_train, np.arange(len(y_train)))

    # Predict the best crop
    pred_idx = int(model.predict([[soil_ph, rainfall, temperature]])[0])
    pred_idx = max(0, min(pred_idx, len(y_train) - 1))  # Ensure valid index
    return {"recommended_crop": y_train[pred_idx]}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
