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
    # Use weights=None to avoid deprecation warning
    model = models.resnet50(pretrained=False)

    # Gradual unfreezing strategy
    for param in model.parameters():
        param.requires_grad = False

    # Unfreeze later stages
    for param in list(model.layer3.parameters()) + list(model.layer4.parameters()):
        param.requires_grad = True

    # Enhanced final classification layer with regularization
    model.fc = nn.Sequential(
        nn.Dropout(0.5),
        nn.Linear(model.fc.in_features, 512),
        nn.BatchNorm1d(512),
        nn.ReLU(),
        nn.Dropout(0.4),
        nn.Linear(512, num_classes)
    )

    return model

def get_model_num_classes(model_path):
    """
    Get the number of classes from the saved model state dict.

    Args:
        model_path (str): Path to the saved model weights

    Returns:
        int: Number of classes in the model
    """
    try:
        state_dict = torch.load(model_path, map_location=torch.device('cpu'))
        # Get the shape of the final layer's weights
        final_layer_weights = state_dict['fc.4.weight']  # Updated key for compatibility
        num_classes = final_layer_weights.shape[0]
        return num_classes
    except Exception as e:
        print(f"Error getting number of classes from model: {e}")
        return None

def load_model(model_path, num_classes=None):
    """
    Load the trained model.

    Args:
        model_path (str): Path to the saved model weights
        num_classes (int, optional): Number of classes to use. If None, will be determined from model

    Returns:
        Loaded PyTorch model
    """
    try:
        # Determine the number of classes if not provided
        if num_classes is None:
            num_classes = get_model_num_classes(model_path)
            if num_classes is None:
                raise ValueError("Could not determine number of classes from model")
            print(f"Detected {num_classes} classes from saved model")

        # Create model with the correct number of classes
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

def predict_single_image(image_file, model, class_names, device=None):
    """
    Predict the class of a single image.

    Args:
        image_file: File object or path to the image
        model (torch.nn.Module): Loaded PyTorch model
        class_names (list): List of class names
        device (torch.device, optional): Device to run prediction on

    Returns:
        Prediction results
    """
    try:
        if device is None:
            device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        model = model.to(device)

        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406],
                              std=[0.229, 0.224, 0.225])
        ])

        # Handle both file objects and file paths
        if isinstance(image_file, str):
            image = Image.open(image_file).convert("RGB")
        else:
            image = Image.open(image_file).convert("RGB")

        input_tensor = transform(image).unsqueeze(0)
        input_tensor = input_tensor.to(device)

        with torch.no_grad():
            outputs = model(input_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            top_k_probs, top_k_indices = torch.topk(probabilities, k=min(5, len(class_names)))

            top_k_probs = top_k_probs.cpu().numpy()[0]
            top_k_indices = top_k_indices.cpu().numpy()[0]

            results = []
            for prob, idx in zip(top_k_probs, top_k_indices):
                if idx < len(class_names):  # Ensure index is valid
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
    MODEL_PATH = "/path/to/your/model.pth"  # Path to your saved model
    DATA_DIR = "/path/to/your/data_dir"     # Directory containing your training data
    IMAGE_PATH = "/path/to/your/image.jpg"  # Path to the image you want to predict

    # Determine device
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    # Load class names from the training directory
    class_names = sorted([d for d in os.listdir(DATA_DIR) if os.path.isdir(os.path.join(DATA_DIR, d)) and not d.startswith('.')])
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
