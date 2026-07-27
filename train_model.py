import os
import joblib
import pandas as pd

from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
)

# ==========================================
# Base Directory
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATASET_PATH = os.path.join(BASE_DIR, "dataset", "CEAS_08.csv")
MODEL_DIR = os.path.join(BASE_DIR, "model")
MODEL_PATH = os.path.join(MODEL_DIR, "phishing_model.pkl")

# ==========================================
# Check Dataset
# ==========================================

if not os.path.exists(DATASET_PATH):
    raise FileNotFoundError(f"Dataset not found: {DATASET_PATH}")

# ==========================================
# Load Dataset
# ==========================================

df = pd.read_csv(DATASET_PATH)

required_columns = ["body", "label"]

for column in required_columns:
    if column not in df.columns:
        raise ValueError(f"Missing required column: {column}")

# ==========================================
# Data Cleaning
# ==========================================

df = df[required_columns].dropna()

df["body"] = df["body"].astype(str).str.strip()
df["label"] = df["label"].astype(int)

X = df["body"]
y = df["label"]

# ==========================================
# Train-Test Split
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y,
)

# ==========================================
# ML Pipeline
# ==========================================

pipeline = Pipeline([
    (
        "tfidf",
        TfidfVectorizer(
            stop_words="english",
            lowercase=True,
            max_features=6000,
            ngram_range=(1, 2),
        ),
    ),
    (
        "classifier",
        LogisticRegression(
            max_iter=1000,
            random_state=42,
        ),
    ),
])

# ==========================================
# Train Model
# ==========================================

print("Training model...\n")

pipeline.fit(X_train, y_train)

# ==========================================
# Evaluation
# ==========================================

predictions = pipeline.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("=" * 60)
print("MODEL TRAINING COMPLETED")
print("=" * 60)

print(f"Accuracy : {accuracy * 100:.2f}%")

print("\nClassification Report")
print(classification_report(y_test, predictions))

print("\nConfusion Matrix")
print(confusion_matrix(y_test, predictions))

# ==========================================
# Save Model
# ==========================================

os.makedirs(MODEL_DIR, exist_ok=True)

joblib.dump(pipeline, MODEL_PATH)

print(f"\nModel saved successfully at:\n{MODEL_PATH}")