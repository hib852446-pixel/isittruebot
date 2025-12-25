# -*- coding: utf-8 -*-
"""
Configuration module for IsItTrue Bot
"""

import os
from dotenv import load_dotenv

load_dotenv()

# API Keys - MUST be set in .env file
TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN") or os.getenv("TELEGRAM_BOT_TOKEN", "")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY", "")

# Logging
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

# Web Server
FLASK_HOST = os.getenv("FLASK_HOST", "0.0.0.0")
FLASK_PORT = int(os.getenv("FLASK_PORT", 5000))
FLASK_DEBUG = os.getenv("FLASK_DEBUG", "True") == "True"

# AI Settings
MODEL_NAME = "models/gemini-2.5-flash"
TEMPERATURE = 0.4
MAX_URL_CONTENT = 10000
MAX_QUERY_LENGTH = 200
