import fitz  # PyMuPDF
import os
import json

def extract_outline(pdf_path):
    doc = fitz.open(pdf_path)
    outline = []
    title = doc.metadata.get("title") or "Untitled Document"

    for page_num, page in enumerate(doc, start=1):
        blocks = page.get_text("dict")["blocks"]
        for block in blocks:
            for line in block.get("lines", []):
                for span in line.get("spans", []):
                    text = span["text"].strip()
                    font_size = span["size"]
                    if not text or len(text) < 3:
                        continue
                    if font_size >= 16:
                        level = "H1"
                    elif font_size >= 14:
                        level = "H2"
                    elif font_size >= 12:
                        level = "H3"
                    else:
                        continue
                    outline.append({
                        "level": level,
                        "text": text,
                        "page": page_num
                    })

    return {
        "title": title,
        "outline": outline
    }

def main():
    input_dir = "input"
    output_dir = "output"
    os.makedirs(output_dir, exist_ok=True)

    for filename in os.listdir(input_dir):
        if filename.endswith(".pdf"):
            pdf_path = os.path.join(input_dir, filename)
            json_path = os.path.join(output_dir, filename.replace(".pdf", ".json"))
            result = extract_outline(pdf_path)
            with open(json_path, "w") as f:
                json.dump(result, f, indent=2)

if __name__ == "__main__":
    main()