from flask import Flask
from flask_cors import CORS
from app import mongo # <--- Import from extensions

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'SecretKey123'
    app.config['MONGO_URI'] = 'mongodb://localhost:27017/Voice_Clone'
    
    mongo.init_app(app) # Initialize the imported mongo
    CORS(app)
    
    from app.routes.auth import auth_bp
    from app.routes.voice import voice_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(voice_bp, url_prefix='/api/voice')
    
    return app