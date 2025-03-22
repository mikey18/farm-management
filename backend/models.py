from sqlalchemy import Column, Integer, String
from database import Base


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String)
    lastname = Column(String)
    email = Column(String)
    password = Column(String)
