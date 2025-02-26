from flask import Flask, render_template, request, jsonify, send_from_directory
import os
import time
from werkzeug.utils import secure_filename
from extract_features import extract_video_features
from check_model import check_model

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXTENSIONS = {"mp4"}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 500 * 1024 * 1024  # Set max upload file size

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
@app.route("/home")
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

        try:
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

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Invalid file format. Only MP4 videos are allowed"}), 400

# Route to serve uploaded files (useful for debugging)
@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
