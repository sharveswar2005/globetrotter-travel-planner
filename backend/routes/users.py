from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db.database import get_db_connection

users_bp = Blueprint("users", __name__)

@users_bp.route("/me", methods=["GET"])
@jwt_required()
def profile():
    user_id = int(get_jwt_identity())
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT name, email FROM travel.users WHERE user_id=%s",
        (user_id,)
    )
    user = cur.fetchone()

    cur.close()
    conn.close()
    return jsonify(user)
