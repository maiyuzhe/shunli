#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from app import db

if __name__ == '__main__':
    # fake = Faker()
    with app.app_context():
        db.create_all()
        print("Starting seed...")
        # Seed code goes here!