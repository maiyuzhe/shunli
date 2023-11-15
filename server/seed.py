# Local imports
from app import app
from models import db

if __name__ == '__main__':
    # fake = Faker()
    with app.app_context():
        db.create_all()
        print("Starting seed...")
        # Seed code goes here!