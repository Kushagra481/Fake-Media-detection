from tensorflow.keras.models import load_model
import numpy as np

# Load the deepfake detection model
model_path = "model/deepfake_detection_model.keras"
model = load_model(model_path)

def check_model(features):
    if features is None:
        return "Error", 0  # If no features were extracted, return an error

    prediction = model.predict(features)  # Get model prediction
    confidence = float(np.max(prediction) * 100)  # Convert to percentage

    result = "Fake" if np.argmax(prediction) == 1 else "Real"
    
    return result, confidence
