import os
import torch
import torch.nn as nn
import torchvision.transforms as transforms
import torchvision.models as models
from PIL import Image
import torch.nn.functional as F

class ImprovedResNet(nn.Module):
    def __init__(self, num_classes):
        super(ImprovedResNet, self).__init__()
        # Use a more powerful backbone - ResNet101 instead of ResNet50
        self.backbone = models.resnet101(pretrained=True)
        
        # Freeze early layers
        for name, param in self.backbone.named_parameters():
            if "layer4" not in name and "fc" not in name:
                param.requires_grad = False
        
        # Improved classifier head
        self.classifier = nn.Sequential(
            nn.Linear(self.backbone.fc.in_features, 1024),
            nn.BatchNorm1d(1024),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(1024, 512),
            nn.BatchNorm1d(512),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(512, num_classes)
        )
        
        # Replace the original fc layer
        self.backbone.fc = nn.Identity()
        
    def forward(self, x):
        features = self.backbone(x)
        return self.classifier(features)

def get_advanced_model(num_classes):
    """
    Create an improved model architecture.
    """
    return ImprovedResNet(num_classes)

def get_transforms(is_training=False):
    """
    Get improved image transformations with better augmentation.
    """
    normalize = transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
    
    if is_training:
        return transforms.Compose([
            transforms.RandomResizedCrop(224),
            transforms.RandomHorizontalFlip(),
            transforms.RandomRotation(15),
            transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2),
            transforms.RandomAdjustSharpness(sharpness_factor=2),
            transforms.ToTensor(),
            normalize
        ])
    else:
        return transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            normalize
        ])

def predict_single_image(image_path, model, class_names, device):
    """
    Enhanced prediction function with improved preprocessing and ensemble prediction.
    """
    try:
        # Load and preprocess image
        image = Image.open(image_path).convert('RGB')
        
        # Create multiple transforms for test-time augmentation
        transform_list = [
            transforms.Compose([
                transforms.Resize(256),
                transforms.CenterCrop(224),
                transforms.ToTensor(),
                transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
            ]),
            transforms.Compose([
                transforms.Resize(256),
                transforms.CenterCrop(224),
                transforms.RandomHorizontalFlip(p=1.0),
                transforms.ToTensor(),
                transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
            ]),
            transforms.Compose([
                transforms.Resize(256),
                transforms.RandomResizedCrop(224, scale=(0.9, 1.0)),
                transforms.ToTensor(),
                transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
            ])
        ]
        
        # Perform test-time augmentation
        predictions = []
        with torch.no_grad():
            for transform in transform_list:
                input_tensor = transform(image).unsqueeze(0).to(device)
                output = model(input_tensor)
                predictions.append(F.softmax(output, dim=1))
        
        # Average predictions from all augmentations
        final_prediction = torch.mean(torch.stack(predictions), dim=0)
        
        # Get top-k predictions
        top_k_probs, top_k_indices = torch.topk(final_prediction, k=5)
        
        top_k_probs = top_k_probs.cpu().numpy()[0]
        top_k_indices = top_k_indices.cpu().numpy()[0]
        
        # Apply confidence thresholding
        confidence_threshold = 0.05  # 5%
        results = []
        for prob, idx in zip(top_k_probs, top_k_indices):
            if prob * 100 >= confidence_threshold:
                results.append({
                    'class': class_names[idx],
                    'probability': float(prob * 100)
                })
        
        return results

    except Exception as e:
        print(f"Error during prediction: {e}")
        return None

def load_model(model_path, num_classes, device):
    """
    Enhanced model loading with error handling and validation.
    """
    try:
        model = get_advanced_model(num_classes)
        
        # Load state dict with error handling
        state_dict = torch.load(model_path, map_location=device)
        model.load_state_dict(state_dict)
        
        model = model.to(device)
        model.eval()
        
        # Validate model
        dummy_input = torch.randn(1, 3, 224, 224).to(device)
        try:
            with torch.no_grad():
                _ = model(dummy_input)
            print("Model validated successfully.")
        except Exception as e:
            print(f"Model validation failed: {e}")
            return None
            
        return model

    except Exception as e:
        print(f"Error loading model: {e}")
        return None