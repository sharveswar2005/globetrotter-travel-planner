from flask import Blueprint, jsonify
from db.database import get_db_connection

public_bp = Blueprint("public", __name__)

@public_bp.route("/<public_url>", methods=["GET"])
def public_trip(public_url):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT trip_id FROM travel.shared_trips
        WHERE public_url=%s
    """, (public_url,))
    trip = cur.fetchone()
    cur.close()
    conn.close()
    return jsonify({"trip_id": trip[0] if trip else None})
