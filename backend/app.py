from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config

from routes.auth import auth_bp
from routes.users import users_bp
from routes.dashboard import dashboard_bp
from routes.trips import trips_bp
from routes.itinerary import itinerary_bp
from routes.cities import cities_bp
from routes.activities import activities_bp
from routes.budget import budget_bp
from routes.timeline import timeline_bp
from routes.public import public_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
JWTManager(app)

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(users_bp, url_prefix="/api/users")
app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")
app.register_blueprint(trips_bp, url_prefix="/api/trips")
app.register_blueprint(itinerary_bp, url_prefix="/api/itinerary")
app.register_blueprint(cities_bp, url_prefix="/api/cities")
app.register_blueprint(activities_bp, url_prefix="/api/activities")
app.register_blueprint(budget_bp, url_prefix="/api/budget")
app.register_blueprint(timeline_bp, url_prefix="/api/timeline")
app.register_blueprint(public_bp, url_prefix="/api/public")

if __name__ == "__main__":
    app.run(debug=True)
