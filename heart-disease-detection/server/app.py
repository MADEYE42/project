from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import torch
from model_utils import load_model, predict_single_image, get_model_num_classes
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Configuration
ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MODEL_PATH = "best_model_segmented88.pth"
DATA_DIR = "./segmentFinal"
UPLOAD_FOLDER = 'uploads'

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename, allowed_extensions):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in allowed_extensions

def load_class_names():
    """Load class names from the training directory"""
    try:
        class_names = sorted([d for d in os.listdir(DATA_DIR) 
                            if os.path.isdir(os.path.join(DATA_DIR, d)) and not d.startswith('.')])
        print(f"Detected class names: {class_names}")
        return class_names
    except Exception as e:
        print(f"Error loading class names: {e}")
        return None

# Initialize model and device globally
try:
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")
    
    # Get number of classes from the saved model
    num_classes = get_model_num_classes(MODEL_PATH)
    if num_classes is None:
        raise RuntimeError("Could not determine number of classes from model")
    print(f"Number of classes in model: {num_classes}")
    
    # Load class names
    class_names = load_class_names()
    if class_names is None:
        raise RuntimeError("Could not load class names")
    print(f"Number of classes detected from directory: {len(class_names)}")
    
    # Validate class numbers match
    if len(class_names) != num_classes:
        print(f"Warning: Number of classes in model ({num_classes}) doesn't match "
              f"number of classes in directory ({len(class_names)})")
        # Use the number of classes from the model
        class_names = class_names[:num_classes]
    
    # Load model with explicit number of classes
    model = load_model(MODEL_PATH, num_classes=num_classes)
    if model is None:
        raise RuntimeError("Model loading returned None")
    
    model.to(device)
    model.eval()  # Ensure model is in evaluation mode
    print("Model initialized successfully")
except Exception as e:
    print(f"Error during initialization: {e}")
    raise

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        # Check if the post request has the required files
        if 'image' not in request.files or 'json' not in request.files:
            return jsonify({'error': 'Missing required files'}), 400
        
        image_file = request.files['image']
        json_file = request.files['json']
        
        # Check if files are selected
        if image_file.filename == '' or json_file.filename == '':
            return jsonify({'error': 'No selected files'}), 400
        
        # Validate image file
        if not allowed_file(image_file.filename, ALLOWED_IMAGE_EXTENSIONS):
            return jsonify({'error': 'Invalid image file format'}), 400
        
        # Validate and load JSON
        try:
            json_data = json.load(json_file)
        except json.JSONDecodeError:
            return jsonify({'error': 'Invalid JSON file'}), 400
        
        # Save image file temporarily
        image_filename = secure_filename(image_file.filename)
        image_path = os.path.join(UPLOAD_FOLDER, image_filename)
        image_file.save(image_path)
        
        # Make prediction
        predictions = predict_single_image(
            image_path,
            model,
            class_names,
            device
        )
        
        # Clean up temporary file
        os.remove(image_path)
        
        if predictions is None:
            return jsonify({'error': 'Prediction failed'}), 500
        
        # Return results along with any relevant JSON data
        return jsonify({
            'results': predictions,
            'metadata': json_data
        })
        
    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'num_classes': len(class_names),
        'device': str(device)
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)