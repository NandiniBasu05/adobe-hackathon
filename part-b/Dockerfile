# Use base image
FROM --platform=linux/amd64 python:3.10-slim

# Set work directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN python -m nltk.downloader punkt

# Entry point
CMD ["python", "main.py"]