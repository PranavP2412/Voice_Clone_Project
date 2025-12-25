import os
import io  # <--- NEW IMPORT
from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename
from pydub import AudioSegment

voice_bp = Blueprint('voice', __name__)

# Configure upload folder
UPLOAD_FOLDER = 'static/audio_uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@voice_bp.route('/clone', methods=['POST'])
def clone_voice():
    # 1. Validation
    if 'audio_file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
        
    file = request.files['audio_file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # 2. Setup Paths
    # We use absolute paths to keep Windows happy
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'static', 'audio_uploads'))
    
    if not os.path.exists(base_dir):
        os.makedirs(base_dir)

    filename = secure_filename(file.filename)
    input_path = os.path.join(base_dir, filename)
    
    clean_name = os.path.splitext(filename)[0]
    output_filename = f"cloned_{clean_name}.wav"
    output_path = os.path.join(base_dir, output_filename)

    try:
        # 3. Save Upload & Process
        file.save(input_path)
        
        # Convert/Process Audio
        sound = AudioSegment.from_file(input_path)
        sound.export(output_path, format="wav")

        # 4. THE FIX: Read file into Memory (RAM)
        # We open the generated file, read its bytes, and store them in a variable 'return_data'
        return_data = io.BytesIO()
        with open(output_path, 'rb') as fo:
            return_data.write(fo.read())
        
        # Reset the "cursor" of the memory file to the beginning so it can be read
        return_data.seek(0)

        # 5. Clean up Disk Files IMMEDIATELY
        # Since the data is safe in RAM, we can delete the physical files now
        if os.path.exists(input_path):
            os.remove(input_path)
        if os.path.exists(output_path):
            os.remove(output_path)

        # 6. Send from Memory
        return send_file(
            return_data, 
            mimetype="audio/wav", 
            as_attachment=True, 
            download_name=output_filename
        )

    except Exception as e:
        print(f"Server Error: {e}")
        # Clean up if error occurs
        if os.path.exists(input_path):
            os.remove(input_path)
        if os.path.exists(output_path):
            os.remove(output_path)
        return jsonify({"error": str(e)}), 500