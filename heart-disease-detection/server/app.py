from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import torch
from model_utils import load_model, predict_single_image
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Configuration
ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MODEL_PATH = "best_model_segmented85.pth"
DATA_DIR = "./segmentFinal"

def allowed_file(filename, allowed_extensions):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in allowed_extensions

def load_class_names():
    """Load class names from the training directory"""
    try:
        class_names = sorted([d for d in os.listdir(DATA_DIR) 
                            if os.path.isdir(os.path.join(DATA_DIR, d))])
        print(f"Detected class names: {class_names}")
        return class_names
    except Exception as e:
        print(f"Error loading class names: {e}")
        # Return a default list of class names if needed
        return [f"Class_{i}" for i in range(11)]  # Assuming 11 classes from the error message

# Initialize model globally
try:
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")
    
    class_names = load_class_names()
    print(f"Number of classes detected: {len(class_names)}")
    
    model = load_model(MODEL_PATH, num_classes=len(class_names))
    if model is None:
        raise RuntimeError("Model loading returned None")
    
    model.to(device)
    print("Model initialized successfully")
except Exception as e:
    print(f"Error during initialization: {e}")
    raise

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'image' not in request.files or 'json' not in request.files:
            return jsonify({'error': 'Missing required files'}), 400
        
        image_file = request.files['image']
        json_file = request.files['json']
        
        if image_file.filename == '' or json_file.filename == '':
            return jsonify({'error': 'No selected files'}), 400
        
        if not allowed_file(image_file.filename, ALLOWED_IMAGE_EXTENSIONS):
            return jsonify({'error': 'Invalid image file format'}), 400
        
        try:
            json_data = json.load(json_file)
        except json.JSONDecodeError:
            return jsonify({'error': 'Invalid JSON file'}), 400
        
        predictions = predict_single_image(
            image_file,
            model,
            class_names,
            device
        )
        
        if predictions is None:
            return jsonify({'error': 'Prediction failed'}), 500
        
        return jsonify({'results': predictions})
        
    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)