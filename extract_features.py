import cv2
import numpy as np
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.applications.resnet50 import preprocess_input

# Load a pre-trained ResNet50 model (excluding the fully connected layer)
resnet_model = ResNet50(weights="imagenet", include_top=False, input_shape=(224, 224, 3))

def extract_video_features(video_path, num_frames=10):
    cap = cv2.VideoCapture(video_path)
    frames = []
    
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    if total_frames == 0:
        cap.release()
        return None  # Handle empty video case

    frame_ids = np.linspace(0, total_frames - 1, num_frames).astype(int)

    for frame_id in frame_ids:
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_id)
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.resize(frame, (224, 224))  # Resize to match ResNet input
        frame = preprocess_input(frame)  # Normalize for ResNet
        frames.append(frame)

    cap.release()

    if len(frames) == 0:
        return None  # No valid frames extracted

    frames = np.array(frames)
    features = resnet_model.predict(frames)  # Extract features using ResNet50

    return features.reshape((1, num_frames, 4, 4, 2048))  # Reshape for the detection model
