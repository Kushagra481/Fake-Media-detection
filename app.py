from flask import Flask, render_template, url_for, request, redirect

app = Flask(__name__)

@app.route("/")
@app.route("/home")
def index():
    return render_template("index.html", title="Home")

@app.route("/about")
def about():
    return render_template("about.html", title="About")

if __name__ == "__main__":
    app.run(debug=True)
