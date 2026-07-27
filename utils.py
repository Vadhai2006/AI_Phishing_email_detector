import re

# ==========================================
# Suspicious Keywords
# ==========================================

SUSPICIOUS_KEYWORDS = [

    "verify",
    "urgent",
    "bank",
    "account",
    "password",
    "click",
    "login",
    "security",
    "limited",
    "update",
    "confirm",
    "winner",
    "lottery",
    "gift",
    "free",
    "invoice",
    "payment",
    "paypal",
    "amazon",
    "credit card",
    "otp",
    "transaction",
    "reset",
    "crypto",
    "bitcoin"

]


# ==========================================
# Extract URLs
# ==========================================

def extract_urls(text):

    pattern = r"(https?://[^\s]+|www\.[^\s]+)"

    return re.findall(pattern, text)


# ==========================================
# Find Keywords
# ==========================================

def find_keywords(text):

    text = text.lower()

    found = []

    for word in SUSPICIOUS_KEYWORDS:

        pattern = r"\b" + re.escape(word) + r"\b"

        if re.search(pattern, text):

            found.append(word)

    return found


# ==========================================
# Threat Score
# ==========================================

def calculate_threat_score(

    prediction,
    confidence,
    urls,
    keywords

):

    score = 0

    # ML Prediction

    if prediction == 1:

        score += 40

    else:

        score += 10


    # Confidence

    score += confidence * 0.30


    # URLs

    score += len(urls) * 10


    # Keywords

    score += len(keywords) * 5


    if score > 100:

        score = 100

    return round(score, 2)


# ==========================================
# Threat Level
# ==========================================

def threat_level(score):

    if score >= 80:

        return "Critical"

    elif score >= 60:

        return "High"

    elif score >= 40:

        return "Medium"

    else:

        return "Low"