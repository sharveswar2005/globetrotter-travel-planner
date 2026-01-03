from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from db.database import get_db_connection

timeline_bp = Blueprint("timeline", __name__)

@timeline_bp.route("/<int:trip_id>", methods=["GET"])
@jwt_required()
def timeline(trip_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT scheduled_date, start_time
        FROM travel.stop_activities
        JOIN travel.trip_stops USING (stop_id)
        WHERE trip_id=%s
    """, (trip_id,))
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(rows)
