# AI Phishing Email Detector

## 📌 Project Overview

The **AI Phishing Email Detector** is a Machine Learning-based web application that detects whether an email is **Safe (Legitimate)** or **Phishing (Malicious)**. It uses Natural Language Processing (NLP) and a trained Machine Learning model to analyze email content and classify it accurately.

The application provides a simple and user-friendly interface where users can paste email text and instantly receive a prediction along with a confidence score, threat level, scan history, and graphical reports.

---

## ✨ Features

- 🔍 Detects phishing emails using Machine Learning.
- 🤖 AI-powered email classification.
- 📊 Displays confidence percentage and threat score.
- 📁 Stores scan history in SQLite database.
- 📈 Generates graphical reports and analytics.
- 📋 Shows prediction history with timestamps.
- ⚡ Fast and lightweight Flask web application.
- 🎨 Responsive and modern user interface.
- 🔐 Helps users identify suspicious emails.

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- Flask

### Machine Learning
- Scikit-learn
- TF-IDF Vectorizer
- Logistic Regression

### Database
- SQLite

### Libraries
- Pandas
- NumPy
- Matplotlib
- Joblib

---

## 📂 Project Structure

```text
AI_Phishing_Email_Detector/
│
├── app.py
├── database.py
├── train_model.py
├── utils.py
│
├── model/
│   ├── phishing_model.pkl
│   └── vectorizer.pkl
│
├── templates/
│   ├── index.html
│   ├── history.html
│   └── report.html
│
├── static/
│   ├── style.css
│   ├── script.js
│   └── graphs/
│
├── database/
│   └── phishing.db
│
├── requirements.txt
└── README.md
```

---

## ⚙️ Working

1. User enters or pastes an email.
2. The email is cleaned and preprocessed.
3. TF-IDF converts text into numerical features.
4. The trained ML model predicts whether the email is Safe or Phishing.
5. The confidence score and threat level are displayed.
6. The prediction is stored in the SQLite database.
7. Reports and graphs are generated automatically.

---

## 🧠 Machine Learning Workflow

- Data Collection
- Data Cleaning
- Text Preprocessing
- Feature Extraction (TF-IDF)
- Model Training
- Model Evaluation
- Prediction
- Database Storage
- Report Generation

---

## 📊 Output

The application provides:

- Email Classification
- Confidence Score
- Threat Level
- Scan History
- Security Report
- Graphical Analytics

---

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/AI_Phishing_Email_Detector.git
```

Move to the project folder:

```bash
cd AI_Phishing_Email_Detector
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Train the model:

```bash
python train_model.py
```

Run the application:

```bash
python app.py
```

Open your browser:

```
http://127.0.0.1:5000
```

---

## 📈 Future Improvements

- Deep Learning-based phishing detection
- URL reputation checking
- Attachment scanning
- Browser extension
- Email API integration
- Cloud deployment
- Multi-language support

---

## 🎯 Applications

- Cybersecurity Awareness
- Email Security
- Educational Projects
- Organization Security
- Personal Email Protection
- Machine Learning Demonstration

---

## 👨‍💻 Author

**Vadhai Thakur**
