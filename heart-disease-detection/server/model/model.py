import os
import torch
import torch.nn as nn
import torchvision.transforms as transforms
import torchvision.models as models
from PIL import Image

def get_advanced_model(num_classes):
    """
    Recreate the model architecture used in training.

    Args:
        num_classes (int): Number of classes in the model

    Returns:
        PyTorch model
    """
    # Use pretrained weights, but with more regularization
    model = models.resnet50(pretrained=False)  # Set pretrained to False

    # Gradual unfreezing strategy
    for param in model.parameters():
        param.requires_grad = False

    # Unfreeze later stages
    for param in list(model.layer3.parameters()) + list(model.layer4.parameters()):
        param.requires_grad = True

    # Enhanced final classification layer with more regularization
    model.fc = nn.Sequential(
        nn.Dropout(0.5),  # Increased dropout
        nn.Linear(model.fc.in_features, 512),
        nn.BatchNorm1d(512),  # Add batch normalization
        nn.ReLU(),
        nn.Dropout(0.4),
        nn.Linear(512, num_classes)
    )

    return model

def load_model(model_path, num_classes):
    """
    Load the trained model.

    Args:
        model_path (str): Path to the saved model weights
        num_classes (int): Number of classes in the model

    Returns:
        Loaded PyTorch model
    """
    try:
        # Create model with the same architecture
        model = get_advanced_model(num_classes)

        # Load the saved state dict
        state_dict = torch.load(model_path, map_location=torch.device('cpu'))

        # Load the state dict
        model.load_state_dict(state_dict)

        # Set model to evaluation mode
        model.eval()

        print("Model loaded successfully.")
        return model

    except Exception as e:
        print(f"Error loading model: {e}")
        return None

def predict_single_image(image_path, model, class_names, device=None):
    """
    Predict the class of a single image.

    Args:
        image_path (str): Path to the image file
        model (torch.nn.Module): Loaded PyTorch model
        class_names (list): List of class names
        device (torch.device, optional): Device to run prediction on

    Returns:
        Prediction results
    """
    try:
        # Set device
        if device is None:
            device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        # Move model to device
        model = model.to(device)

        # Image preprocessing
        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                 std=[0.229, 0.224, 0.225])
        ])

        # Open and preprocess the image
        image = Image.open(image_path).convert("RGB")
        input_tensor = transform(image).unsqueeze(0)  # Add batch dimension
        input_tensor = input_tensor.to(device)

        # Disable gradient calculation
        with torch.no_grad():
            # Get model predictions
            outputs = model(input_tensor)

            # Get probabilities and top predictions
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            top_k_probs, top_k_indices = torch.topk(probabilities, k=5)

            # Convert to lists for easier handling
            top_k_probs = top_k_probs.cpu().numpy()[0]
            top_k_indices = top_k_indices.cpu().numpy()[0]

            # Prepare prediction results
            results = []
            for prob, idx in zip(top_k_probs, top_k_indices):
                results.append({
                    'class': class_names[idx],
                    'probability': float(prob * 100)
                })

            return results

    except Exception as e:
        print(f"Error during prediction: {e}")
        return None

def main():
    # Configuration - adjust these paths as needed
    MODEL_PATH = "best_model_segmented85.pth"  # Path to your saved model
    DATA_DIR = "heart-disease-detection/server/segmentFinal"  # Directory containing your training data
    IMAGE_PATH = "/upload/"  # Path to the image you want to predict

    # Determine device
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    # Load class names from the training directory
    class_names = sorted([d for d in os.listdir(DATA_DIR) if os.path.isdir(os.path.join(DATA_DIR, d))])
    print(f"Detected classes: {class_names}")

    # Load the model
    model = load_model(MODEL_PATH, num_classes=len(class_names))

    if model is not None:
        # Predict single image
        predictions = predict_single_image(
            IMAGE_PATH,
            model,
            class_names,
            device
        )

        # Display results
        if predictions:
            print("\nTop 5 Predictions:")
            for i, pred in enumerate(predictions, 1):
                print(f"{i}. {pred['class']}: {pred['probability']:.2f}%")
        else:
            print("Prediction failed.")

if __name__ == "__main__":
    main()