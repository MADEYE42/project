import sys
import json
import torch
import torchvision.transforms as transforms
from PIL import Image
from model.model import get_advanced_model, load_model

def extract_class_names(json_path):
    """
    Extract class names from the JSON file.
    Args:
        json_path (str): Path to the input JSON file.
    Returns:
        list: A list of unique class names.
    """
    with open(json_path, "r") as f:
        data = json.load(f)

    # Extract unique labels (class names) from the 'shapes' key
    if "shapes" not in data:
        raise KeyError("The JSON file does not contain the 'shapes' key.")
    
    class_names = sorted(set(shape["label"] for shape in data["shapes"]))
    return class_names

def predict(image_path, json_path):
    """
    Predict the class of an image and map it to labels from a JSON file.
    Args:
        image_path (str): Path to the image file.
        json_path (str): Path to the JSON file containing class names.
    """
    # Configuration
    MODEL_PATH = "heart-disease-detection/ml-model/best_model.pth"

    # Extract class names
    try:
        class_names = extract_class_names(json_path)
    except Exception as e:
        print(f"Error extracting class names: {e}")
        sys.exit(1)

    # Load model
    model = load_model(MODEL_PATH, num_classes=len(class_names))
    if model is None:
        print("Error: Model could not be loaded. Please check the model path and loading function.")
        sys.exit(1)

    # Image Preprocessing
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    try:
        image = Image.open(image_path).convert("RGB")
        input_tensor = transform(image).unsqueeze(0)
    except Exception as e:
        print(f"Error processing the image: {e}")
        sys.exit(1)

    # Prediction
    try:
        with torch.no_grad():
            outputs = model(input_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            _, predicted_idx = torch.max(probabilities, 1)

        # Prepare results
        results = {
            "class": class_names[predicted_idx.item()],
            "confidence": float(probabilities[0][predicted_idx] * 100)
        }

        # Output results as JSON
        print(json.dumps(results, indent=4))
    except Exception as e:
        print(f"Error during prediction: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Command line arguments: image_path and json_path
    if len(sys.argv) != 3:
        print("Usage: python predict.py <image_path> <json_path>")
        sys.exit(1)

    image_path = sys.argv[1]
    json_path = sys.argv[2]
    predict(image_path, json_path)
