import sys
import json
import torch
import torchvision.transforms as transforms
from PIL import Image
from model import get_advanced_model, load_model

def predict(image_path, json_path):
    # Configuration
    MODEL_PATH = "heart-disease-detection/ml-model/best_model.pth"

    # Load class names from JSON file
    with open(json_path, "r") as f:
        class_names = json.load(f)["classes"]

    # Load model
    model = load_model(MODEL_PATH, num_classes=len(class_names))

    # Image Preprocessing
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    image = Image.open(image_path).convert("RGB")
    input_tensor = transform(image).unsqueeze(0)

    # Prediction
    with torch.no_grad():
        outputs = model(input_tensor)
        probabilities = torch.nn.functional.softmax(outputs, dim=1)
        _, predicted_idx = torch.max(probabilities, 1)

    results = {
        "class": class_names[predicted_idx.item()],
        "confidence": float(probabilities[0][predicted_idx] * 100)
    }

    print(json.dumps(results))  # Output as JSON

if __name__ == "__main__":
    image_path = sys.argv[1]
    json_path = sys.argv[2]
    predict(image_path, json_path)
