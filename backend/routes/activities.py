from flask import Blueprint, jsonify
from db.database import get_db_connection

activities_bp = Blueprint("activities", __name__)

@activities_bp.route("/<int:city_id>", methods=["GET"])
def activities(city_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT activity_id, activity_name, estimated_cost
        FROM travel.activities WHERE city_id=%s
    """, (city_id,))
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(rows)
