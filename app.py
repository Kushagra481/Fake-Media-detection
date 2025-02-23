from flask import Flask, render_template, request, jsonify
import os
import time
from werkzeug.utils import secure_filename
from extract_features import extract_video_features
from check_model import check_model

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXTENSIONS = {"mp4"}  # Only allow video files

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def index():
    return render_template("index.html", title="Home")

@app.route("/about")
def about():
    return render_template("about.html", title="About")

@app.route("/analyze", methods=["POST"])
def analyze():
    time.sleep(2)  # Simulate processing delay

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(file_path)

        # Extract video features
        features = extract_video_features(file_path)

        if features is None:
            return jsonify({"error": "Failed to process video"}), 500

        # Check model prediction
        result, confidence = check_model(features)

        return jsonify({
            "success": True,
            "result": result,
            "confidence": f"{confidence:.1f}%",
            "indicators": ["AI analysis completed", "Feature consistency checked"]
        })

    return jsonify({"error": "Invalid file format. Only MP4 videos are allowed"}), 400

if __name__ == "__main__":
    app.run(debug=True)
