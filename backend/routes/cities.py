from flask import Blueprint, jsonify
from db.database import get_db_connection

cities_bp = Blueprint("cities", __name__)

@cities_bp.route("/", methods=["GET"])
def cities():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT city_id, city_name, country FROM travel.cities")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(rows)
