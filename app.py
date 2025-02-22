from flask import Flask, render_template, url_for, request, redirect, jsonify
import random
import time

app = Flask(__name__)

@app.route("/")
@app.route("/home")
def index():
    return render_template("index.html", title="Home")

@app.route("/about")
def about():
    return render_template("about.html", title="About")

@app.route("/analyze", methods=["POST"])
def analyze():
    # Simulate processing time
    time.sleep(2)
    
    # Get the content from request
    data = request.get_json()
    content = data.get('content', '')
    
    # Simple mock logic based on content length
    confidence = min(85 + len(content) / 10, 99) if content else 70
    
    indicators = [
        "Pattern analysis complete",
        "Source verification done",
        "Content consistency checked"
    ]
    
    return jsonify({
        "success": True,
        "confidence": f"{confidence:.1f}%",
        "indicators": indicators
    })

if __name__ == "__main__":
    app.run(debug=True)
