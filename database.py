import sqlite3
import os

# ==========================
# Database Path
# ==========================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATABASE = os.path.join(
    BASE_DIR,
    "database",
    "phishing.db"
)


# ==========================
# Create Connection
# ==========================

def get_connection():

    return sqlite3.connect(DATABASE)


# ==========================
# Create Table
# ==========================

def create_table():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS history (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        email TEXT,

        prediction INTEGER,

        confidence REAL,

        risk TEXT,

        score REAL,

        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP

    )
    """)

    conn.commit()

    conn.close()


# ==========================
# Save Result
# ==========================

def save_result(
        email,
        prediction,
        confidence,
        risk,
        score
):

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO history
        (
            email,
            prediction,
            confidence,
            risk,
            score
        )

        VALUES
        (?, ?, ?, ?, ?)
    """,

    (
        email,
        prediction,
        confidence,
        risk,
        score
    ))

    conn.commit()

    conn.close()


# ==========================
# Get History
# ==========================

def get_history():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("""

        SELECT *

        FROM history

        ORDER BY id DESC

    """)

    rows = cursor.fetchall()

    conn.close()

    return rows