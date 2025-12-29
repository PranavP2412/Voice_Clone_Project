from flask import Blueprint, request, jsonify, session
# CORRECT IMPORT
from app.extensions import mongo

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    if request.method == "POST":
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
    
    # Validation
        if not email or not password:
            return jsonify({"error": "Missing email or password"})

    # Check existence
        existing_user = mongo.db.users.find_one({"email": email})
        if existing_user:
            return jsonify({"error": "User already exists"})

    # Insert User
        new_user = {
            "email": email,
            "password": password  # (Security Tip: You should hash this later!)
        }
        mongo.db.users.insert_one(new_user)

    # 2. FIX: Return JSON, don't redirect on the server
        return jsonify({"message": "Registration successful"})

    


@auth_bp.route('/login', methods=['POST'])
def login():
    if request.method == "POST":
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = mongo.db.users.find_one({"email": email})
        if user and user['password'] == password:
        
            user_id = str(user['_id']) 
            session['user'] = user_id;
        
            return jsonify({
                "message": "Login successful",
                "user_id": user_id
            }), 200
        else:
            return jsonify({"error": "Invalid credentials"})