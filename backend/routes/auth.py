from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from db.database import get_db_connection
import hashlib

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    pwd = hashlib.sha256(data["password"].encode()).hexdigest()

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO travel.users (name, email, password_hash)
        VALUES (%s, %s, %s) RETURNING user_id
    """, (data["name"], data["email"], pwd))

    user_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"user_id": user_id}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    pwd = hashlib.sha256(data["password"].encode()).hexdigest()

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT user_id FROM travel.users
        WHERE email=%s AND password_hash=%s
    """, (data["email"], pwd))

    user = cur.fetchone()
    cur.close()
    conn.close()

    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=str(user[0]))
    return jsonify({"access_token": token})
