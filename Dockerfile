# Use a slim version of Python
FROM --platform=linux/amd64 python:3.10-slim

# Set working directory inside the container
WORKDIR /app

# Copy everything from your project to the container
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Run your script when the container starts
CMD ["python", "main.py"]