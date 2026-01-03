from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db.database import get_db_connection

trips_bp = Blueprint("trips", __name__)

@trips_bp.route("/", methods=["POST"])
@jwt_required()
def create_trip():
    user_id = get_jwt_identity()
    data = request.json

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO travel.trips (user_id, trip_name, start_date, end_date)
        VALUES (%s, %s, %s, %s) RETURNING trip_id
    """, (user_id, data["trip_name"], data["start_date"], data["end_date"]))

    trip_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"trip_id": trip_id})


@trips_bp.route("/", methods=["GET"])
@jwt_required()
def my_trips():
    user_id = int(get_jwt_identity())
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM travel.trips WHERE user_id=%s", (user_id,))
    trips = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(trips)
