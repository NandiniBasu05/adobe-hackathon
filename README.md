# Adobe India Hackathon 2025 – Round 1 Submission 🚀

## 🔍 Project Overview
This solution covers both *Round 1A* and *Round 1B*:

- *1A:* Extract structured outline (Title, H1, H2, H3) from PDFs and output JSON.
- *1B:* Persona-based section extraction — prioritizes relevant content using NLP.

---

## 🧠 Round 1A – Document Outline Extraction

### ▶ Approach
- Parsed PDF using PyMuPDF to analyze layout, font sizes, positions.
- Applied custom heading classification logic beyond font size alone.
- Structured headings into JSON with levels (H1–H3) and page numbers.

### 📦 Libraries Used
- PyMuPDF
- re (regex), os

### 🐳 Docker
- Dockerfile builds and runs locally using:
```bash
docker build --platform linux/amd64 -t adobe-solution-1a .
docker run --rm -v "$(pwd)/input:/app/input" -v "$(pwd)/output:/app/output" --network none adobe-solution-1a
