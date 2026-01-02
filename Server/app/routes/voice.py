import os
import io
from flask import Blueprint, request, jsonify, send_file, session
from werkzeug.utils import secure_filename
from pydub import AudioSegment

voice_bp = Blueprint('voice', __name__)

@voice_bp.route('/clone', methods=['POST'])
def clone_voice():
    if 'audio_file' not in request.files:
        return jsonify({"error": "No file uploaded"})
    
    file = request.files['audio_file']
    if file.filename == '':
        return jsonify({"error": "No selected file"})

    source_lang = request.form.get('source_lang', 'English')
    target_lang = request.form.get('target_lang', 'Hindi')
    
    print(f"Processing audio: {source_lang} -> {target_lang}")

    # --- 4. Setup Paths ---
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
        file.save(input_path)
        
        sound = AudioSegment.from_file(input_path)
        
        # TODO: FUTURE AI TRANSLATION LOGIC GOES HERE
        # For now, we just export the original file as WAV to test the pipeline
        sound.export(output_path, format="wav")

        # Read file into Memory (RAM)
        return_data = io.BytesIO()
        with open(output_path, 'rb') as fo:
            return_data.write(fo.read())
        
        return_data.seek(0)

        #Clean up Disk Files IMMEDIATELY
        if os.path.exists(input_path):
            os.remove(input_path)
        if os.path.exists(output_path):
            os.remove(output_path)

        #Send from Memory
        return send_file(
            return_data, 
            mimetype="audio/wav", 
            as_attachment=True, 
            download_name=output_filename
        )

    except Exception as e:
        print(f"Server Error: {e}")
        if os.path.exists(input_path):
            os.remove(input_path)
        if os.path.exists(output_path):
            os.remove(output_path)
        return jsonify({"error": str(e)})