from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from db.database import get_db_connection

budget_bp = Blueprint("budget", __name__)

@budget_bp.route("/<int:trip_id>", methods=["GET"])
@jwt_required()
def budget(trip_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT cost_type, SUM(estimated_cost)
        FROM travel.trip_costs
        WHERE trip_id=%s GROUP BY cost_type
    """, (trip_id,))
    data = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(data)
