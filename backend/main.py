from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import models
from functions import hash_password, verify_password
from database import engine, SessionLocal
import pandas as pd
from ml import predict_crops

app = FastAPI()

# cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change to specific domains in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# cors

# Create Tables
models.Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Models
# Define request model
class FarmParameters(BaseModel):
    soilType: str
    pH: float
    rainfall: str
    temperature: str
    season: str
    
class Create_User(BaseModel):
    firstname: str
    lastname: str
    email: str
    password: str


class Get_User(BaseModel):
    firstname: str
    lastname: str
    email: str


class Login_User(BaseModel):
    email: str
    password: str


@app.post("/create_user")
def create_user(data: Create_User, db: Session = Depends(get_db)):
    email_exists_user = (
        db.query(models.User).filter(models.User.email == data.email).first()
    )

    if email_exists_user:
        return {"status": 400, "msg": "email already exists"}

    user_model = models.User()
    user_model.firstname = data.firstname
    user_model.lastname = data.lastname
    user_model.email = data.email
    user_model.password = hash_password(data.password)
    db.add(user_model)
    db.commit()

    user_data = Get_User(
        firstname=user_model.firstname,
        lastname=user_model.lastname,
        email=user_model.email,
    )
    return {"status": 200, "data": user_data}


@app.post("/login_user")
def login_user(data: Login_User, db: Session = Depends(get_db)):
    user_model = db.query(models.User).filter(models.User.email == data.email).first()
    if user_model and verify_password(data.password, user_model.password):
        user_data = Get_User(
            firstname=user_model.firstname,
            lastname=user_model.lastname,
            email=user_model.email,
        )
        return {"status": 200, "data": user_data}
    else:
        return {"status": 400, "msg": "Invalid email or password"}

# Define the expected input schema using Pydantic
class FarmParameters(BaseModel):
    soilType: str
    pH: float
    rainfall: str
    temperature: str
    season: str



class FarmParameters(BaseModel):
    soilType: str
    pH: float
    rainfall: str
    temperature: str
    season: str


@app.post("/predict/")
def predict(data: FarmParameters):
    input_data = pd.DataFrame([{
        "soilType": data.soilType,
        "pH": data.pH,
        "rainfall": data.rainfall,
        "temperature": data.temperature,
        "season": data.season
    }])

    predicted_crops = predict_crops(input_data)
    return predicted_crops

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
