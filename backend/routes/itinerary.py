from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from db.database import get_db_connection

itinerary_bp = Blueprint("itinerary", __name__)

@itinerary_bp.route("/stops", methods=["POST"])
@jwt_required()
def add_stop():
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO travel.trip_stops
        (trip_id, city_id, start_date, end_date, stop_order)
        VALUES (%s, %s, %s, %s, %s)
    """, tuple(data.values()))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "Stop added"})
