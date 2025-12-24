from flask import Blueprint, request, jsonify
from app import mongo

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    # Validation
    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    # Check existence
    existing_user = mongo.db.users.find_one({"email": email})
    if existing_user:
        return jsonify({"error": "User already exists"}), 409

    # Insert User
    new_user = {
        "email": email,
        "password": password  # (Security Tip: You should hash this later!)
    }
    mongo.db.users.insert_one(new_user)

    # 2. FIX: Return JSON, don't redirect on the server
    return jsonify({"message": "Registration successful"}), 201


# --- LOGIN ROUTE ---
@auth_bp.route('/login', methods=['POST'])
def login():
    # 1. FIX: Get JSON data correctly
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = mongo.db.users.find_one({"email": email})

    # 2. FIX: Check 'password' field in database vs 'password' variable
    if user and user['password'] == password:
        
        # Convert ObjectId to string for JSON
        user_id = str(user['_id']) 
        
        # 3. FIX: Return JSON to React
        return jsonify({
            "message": "Login successful",
            "user_id": user_id
        }), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401