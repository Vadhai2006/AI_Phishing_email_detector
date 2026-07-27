import os
import joblib

from flask import Flask, render_template, request

from database import create_table, save_result, get_history
from utils import (
    extract_urls,
    find_keywords,
    calculate_threat_score,
    threat_level,
)

app = Flask(__name__)

# ==========================================
# Base Directory
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "phishing_model.pkl"
)

# ==========================================
# Load Trained Model
# ==========================================

try:
    model = joblib.load(MODEL_PATH)

except Exception as e:

    print(f"Model Loading Error : {e}")

    model = None


# ==========================================
# Initialize Database
# ==========================================

create_table()


# ==========================================
# Home Page
# ==========================================

@app.route("/")
def home():

    return render_template(
        "index.html",
        email="",
        prediction=None,
        confidence=0,
        risk="",
        urls=[],
        keywords=[],
        score=0,
        level="Low",
        error=None,
    )


# ==========================================
# Predict Email
# ==========================================

@app.route("/predict", methods=["POST"])
def predict():

    if model is None:

        return render_template(
            "index.html",
            error="Model could not be loaded.",
            email="",
            prediction=None,
            confidence=0,
            risk="",
            urls=[],
            keywords=[],
            score=0,
            level="Low",
        )

    email = request.form.get("email", "").strip()

    # Empty Validation
    if not email:

        return render_template(
            "index.html",
            error="Please enter an email.",
            email="",
            prediction=None,
            confidence=0,
            risk="",
            urls=[],
            keywords=[],
            score=0,
            level="Low",
        )

    # Very Small Input Validation

    if len(email) < 10:

        return render_template(
            "index.html",
            error="Email content is too short.",
            email=email,
            prediction=None,
            confidence=0,
            risk="",
            urls=[],
            keywords=[],
            score=0,
            level="Low",
        )

    try:

        prediction = int(
            model.predict([email])[0]
        )

        if hasattr(model, "predict_proba"):

            probability = model.predict_proba([email])[0]

            confidence = round(
                max(probability) * 100,
                2
            )

        else:

            confidence = 0

    except Exception as e:

        return render_template(
            "index.html",
            error=f"Prediction Error : {e}",
            email=email,
            prediction=None,
            confidence=0,
            risk="",
            urls=[],
            keywords=[],
            score=0,
            level="Low",
        )

    # ======================================
    # Cyber Security Analysis
    # ======================================

    urls = extract_urls(email)

    keywords = find_keywords(email)

    score = calculate_threat_score(
        prediction,
        confidence,
        urls,
        keywords,
    )

    level = threat_level(score)

    risk = "High" if prediction == 1 else "Low"

    # ======================================
    # Save History
    # ======================================

    save_result(
        email=email,
        prediction=prediction,
        confidence=confidence,
        risk=risk,
        score=score,
    )

    # ======================================
    # Return Result
    # ======================================

    return render_template(
        "index.html",
        email=email,
        prediction=prediction,
        confidence=confidence,
        risk=risk,
        urls=urls,
        keywords=keywords,
        score=score,
        level=level,
        error=None,
    )


# ==========================================
# History
# ==========================================

@app.route("/history")
def history():

    history = get_history()

    return render_template(
        "history.html",
        history=history,
    )


# ==========================================
# Report
# ==========================================

@app.route("/report")
def report():

    return render_template(
        "report.html",
        email="",
        prediction=None,
        confidence=0,
        urls=[],
        keywords=[],
        score=0,
        level="Low",
    )


# ==========================================
# Run App
# ==========================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )