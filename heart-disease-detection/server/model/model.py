import torch
import torch.nn as nn
import torchvision.transforms as transforms
import torchvision.models as models
from torchvision.models import ResNet50_Weights  # Import weights enum
from PIL import Image

def get_advanced_model(num_classes):
    """
    Recreate the model architecture used in training.

    Args:
        num_classes (int): Number of classes in the model

    Returns:
        PyTorch model
    """
    # Use pretrained weights via 'weights' argument instead of 'pretrained'
    model = models.resnet50(weights=None)  # No pretrained weights
  # Set pretrained weights to default

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

        # Load the saved state dict with weights_only=True
        state_dict = torch.load(model_path, map_location=torch.device('cpu'), weights_only=True)

        # Load the state dict
        model.load_state_dict(state_dict)

        # Set model to evaluation mode
        model.eval()

        print("Model loaded successfully.")
        return model

    except Exception as e:
        print(f"Error loading model: {e}")
        return None
