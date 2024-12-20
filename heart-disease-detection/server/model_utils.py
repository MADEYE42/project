import os
import torch
import torch.nn as nn
import torchvision.transforms as transforms
import torchvision.models as models
from PIL import Image
import io
from werkzeug.datastructures import FileStorage

def get_advanced_model(num_classes):
    """
    Recreate the model architecture used in training.
    """
    model = models.resnet50(weights=None)

    for param in model.parameters():
        param.requires_grad = False

    for param in list(model.layer3.parameters()) + list(model.layer4.parameters()):
        param.requires_grad = True

    model.fc = nn.Sequential(
        nn.Dropout(0.5),
        nn.Linear(model.fc.in_features, 512),
        nn.BatchNorm1d(512),
        nn.ReLU(),
        nn.Dropout(0.4),
        nn.Linear(512, num_classes)
    )

    return model

def load_model(model_path, num_classes):
    """
    Load the trained model.
    """
    try:
        state_dict = torch.load(model_path, map_location=torch.device('cpu'))
        
        fc_weight_key = 'fc.5.weight'
        if fc_weight_key in state_dict:
            saved_num_classes = state_dict[fc_weight_key].size(0)
            print(f"Detected {saved_num_classes} classes in saved model")
            
            if saved_num_classes != num_classes:
                print(f"Warning: Mismatch between saved model classes ({saved_num_classes}) "
                      f"and detected classes ({num_classes}). Using saved model's class count.")
                num_classes = saved_num_classes
        
        model = get_advanced_model(num_classes)
        model.load_state_dict(state_dict, strict=True)
        model.eval()
        print("Model loaded successfully.")
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        return None

def predict_single_image(image_file, model, class_names, device=None):
    """
    Predict the class of a single image.
    """
    try:
        if device is None:
            device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        model = model.to(device)

        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])

        # Handle different types of image inputs
        try:
            if isinstance(image_file, FileStorage):
                # For Flask's FileStorage objects
                image_bytes = image_file.read()
                image = Image.open(io.BytesIO(image_bytes))
            elif isinstance(image_file, str):
                # For file paths
                image = Image.open(image_file)
            elif isinstance(image_file, bytes):
                # For raw bytes
                image = Image.open(io.BytesIO(image_file))
            else:
                raise ValueError(f"Unsupported image type: {type(image_file)}")

            # Reset file pointer for FileStorage objects
            if isinstance(image_file, FileStorage):
                image_file.seek(0)

        except Exception as e:
            print(f"Error loading image: {e}")
            raise ValueError("Failed to load image file")

        # Convert to RGB if needed
        if image.mode != 'RGB':
            image = image.convert('RGB')

        # Apply transformations and add batch dimension
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
                class_name = class_names[idx] if idx < len(class_names) else f"Class_{idx}"
                results.append({
                    'class': class_name,
                    'probability': float(prob * 100)
                })

            return results

    except Exception as e:
        print(f"Error during prediction: {e}")
        print(f"Image file type: {type(image_file)}")
        if isinstance(image_file, FileStorage):
            print(f"FileStorage name: {image_file.filename}")
        return None