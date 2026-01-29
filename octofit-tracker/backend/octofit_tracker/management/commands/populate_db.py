from django.core.management.base import BaseCommand
from django.conf import settings

from django.contrib.auth import get_user_model
from django.apps import apps

import pymongo

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Connecting to MongoDB...'))
        client = pymongo.MongoClient('mongodb://localhost:27017/')
        db = client['octofit_db']

        # Drop collections if they exist
        for col in ['users', 'teams', 'activities', 'leaderboard', 'workouts']:
            db[col].drop()

        # Create unique index on email for users
        db['users'].create_index('email', unique=True)

        # Sample data
        users = [
            {"name": "Bruce Wayne", "email": "batman@dc.com", "team": "dc"},
            {"name": "Clark Kent", "email": "superman@dc.com", "team": "dc"},
            {"name": "Diana Prince", "email": "wonderwoman@dc.com", "team": "dc"},
            {"name": "Tony Stark", "email": "ironman@marvel.com", "team": "marvel"},
            {"name": "Steve Rogers", "email": "captain@marvel.com", "team": "marvel"},
            {"name": "Natasha Romanoff", "email": "blackwidow@marvel.com", "team": "marvel"},
        ]
        teams = [
            {"name": "marvel", "members": ["Tony Stark", "Steve Rogers", "Natasha Romanoff"]},
            {"name": "dc", "members": ["Bruce Wayne", "Clark Kent", "Diana Prince"]},
        ]
        activities = [
            {"user": "Bruce Wayne", "activity": "Running", "duration": 30},
            {"user": "Tony Stark", "activity": "Cycling", "duration": 45},
        ]
        leaderboard = [
            {"team": "marvel", "points": 120},
            {"team": "dc", "points": 110},
        ]
        workouts = [
            {"user": "Steve Rogers", "workout": "Pushups", "reps": 100},
            {"user": "Diana Prince", "workout": "Squats", "reps": 80},
        ]

        db['users'].insert_many(users)
        db['teams'].insert_many(teams)
        db['activities'].insert_many(activities)
        db['leaderboard'].insert_many(leaderboard)
        db['workouts'].insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
