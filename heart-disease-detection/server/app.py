import os
import json
import torch
import torch.nn as nn
from torchvision import transforms, models
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

# Flask app setup
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Set up logging for better debugging
logging.basicConfig(level=logging.DEBUG)

# Device configuration
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
logging.info(f"Using device: {device}")

# Load the trained model
def load_model(model_path, num_classes):
    # Load ResNet50 model with custom classifier
    logging.info(f"Loading model from {model_path}...")
    model = models.resnet50(pretrained=False)
    model.fc = nn.Sequential(
        nn.Dropout(0.5),
        nn.Linear(model.fc.in_features, 512),
        nn.BatchNorm1d(512),
        nn.ReLU(),
        nn.Dropout(0.4),
        nn.Linear(512, num_classes)
    )
    # Load model weights
    model.load_state_dict(torch.load(model_path, map_location=device))
    model = model.to(device)
    model.eval()  # Set model to evaluation mode
    logging.info("Model loaded and set to evaluation mode.")
    return model

# Define transformations for preprocessing images
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Resize image to match input size
    transforms.ToTensor(),  # Convert to Tensor
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize
])

# Predict the image class
def predict_image(model, image, class_names):
    # Preprocess the image
    image = transform(image).unsqueeze(0).to(device)
    logging.debug(f"Image shape after transformation: {image.shape}")

    # Make predictions
    with torch.no_grad():  # Disable gradient calculation
        outputs = model(image)
        logging.debug(f"Model raw output (logits): {outputs}")
        
        probabilities = torch.nn.functional.softmax(outputs, dim=1)  # Apply softmax to get probabilities
        top_probs, top_classes = torch.topk(probabilities, 5)  # Top 5 predictions

    # Format the results
    results = []
    for i in range(len(top_classes[0])):
        results.append({
            "class": class_names[top_classes[0][i].item()],
            "probability": top_probs[0][i].item() * 100  # Convert to percentage
        })
    return results

# Model configurations
MODEL_PATH = "best_model_segmented_synthetic91.pth"  # Path to the saved model
CLASS_NAMES = [
    "3VT", "ARSA", "AVSD", "Dilated Cardiac Sinus", "ECIF", 
    "HLHS", "LVOT", "Normal Heart", "TGA", "VSD"
]  # Replace with your actual class names
NUM_CLASSES = len(CLASS_NAMES)

# Load the model
model = load_model(MODEL_PATH, NUM_CLASSES)

# Endpoint to handle file upload and prediction
@app.route("/upload", methods=["POST"])
def upload_file():
    try:
        # Check for uploaded files
        if "image" not in request.files or "json" not in request.files:
            return jsonify({"error": "Both image and JSON files are required!"}), 400

        image_file = request.files["image"]
        json_file = request.files["json"]

        # Validate image file
        if not image_file.filename.endswith(('.png', '.jpg', '.jpeg')):
            return jsonify({"error": "Invalid image format! Only .png, .jpg, .jpeg are accepted."}), 400
        if not json_file.filename.endswith('.json'):
            return jsonify({"error": "Invalid JSON format! Only .json is accepted."}), 400

        # Process image
        image = Image.open(image_file).convert("RGB")  # Ensure RGB format
        logging.info(f"Image {image_file.filename} loaded.")

        # Process JSON
        json_data = json.load(json_file)
        annotations = []
        for shape in json_data.get("shapes", []):
            annotations.append({
                "label": shape.get("label"),
                "points": shape.get("points")
            })

        # Prediction
        predictions = predict_image(model, image, CLASS_NAMES)
        logging.info(f"Predictions made: {predictions}")

        # Generate related image paths based on top prediction
        if predictions:
            top_class = predictions[0]["class"]
            related_images = [
                f"/Segregated_Final/{top_class}/{top_class}({i + 1}).jpg"
                for i in range(8)
            ]
            logging.info(f"Generated related images: {related_images}")
        else:
            related_images = []

        # Response
        return jsonify({
            "results": predictions,
            "annotations": annotations,
            "related_images": related_images
        })

    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    # Enable debugging for detailed logs
    app.run(debug=True)
