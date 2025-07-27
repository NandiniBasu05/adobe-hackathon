# Adobe Hackathon 2025 - Round 1A: PDF Outline Extractor

##  Problem
Extract structured outline (title + H1, H2, H3 headings with page numbers) from PDFs (up to 50 pages).

## Tech Stack
- Python 3.10
- [PyMuPDF](https://pymupdf.readthedocs.io/) for PDF parsing
- Docker (linux/amd64 platform)

##  Input
- Place PDFs inside `/input` directory.
- Example: `sample.pdf`

##  Output
- Outputs a `.json` file for each `.pdf` in `/output`.
- Format:
```json
{
  "title": "Understanding AI",
  "outline": [
    { "level": "H1", "text": "Introduction", "page": 1 },
    { "level": "H2", "text": "Basics", "page": 2 }
  ]
}