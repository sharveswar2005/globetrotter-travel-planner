from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db.database import get_db_connection

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/", methods=["GET"])
@jwt_required()
def dashboard():
    user_id = int(get_jwt_identity())
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT trip_id, trip_name, start_date, end_date
        FROM travel.trips WHERE user_id=%s
    """, (user_id,))
    trips = cur.fetchall()

    cur.close()
    conn.close()
    return jsonify(trips)
