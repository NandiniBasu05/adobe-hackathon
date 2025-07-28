import os
import fitz  # PyMuPDF
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
nltk.download('punkt')


INPUT_DIR = "input"
OUTPUT_DIR = "output"

def load_persona_job():
    with open(os.path.join(INPUT_DIR, "persona_job.json"), "r") as f:
        return json.load(f)

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    sections = []
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text()
        paragraphs = [p.strip() for p in text.split('\n\n') if len(p.strip()) > 100]  # filter short chunks
        for para in paragraphs:
            sections.append({
                "text": para,
                "page": page_num + 1
            })
    return sections

def rank_sections(sections, job_description, top_k=5):
    corpus = [s["text"] for s in sections]
    corpus.insert(0, job_description)

    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(corpus)
    similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()

    ranked = sorted(zip(sections, similarities), key=lambda x: x[1], reverse=True)
    return [
        {
            "document": s.get("source", "unknown"),
            "page": s["page"],
            "section_title": s["text"].split('.')[0][:60], # first sentence or first 60 chars
            "importance_rank": i + 1,
            "refined_text": s["text"]
        }
        for i, (s, score) in enumerate(ranked[:top_k])
    ]

def main():
    persona_job = load_persona_job()
    job_description = f"{persona_job['persona']} needs to: {persona_job['job']}"

    final_results = {
        "metadata": {
            "input_documents": [],
            "persona": persona_job['persona'],
            "job_to_be_done": persona_job['job']
        },
        "extracted_sections": []
    }

    for filename in os.listdir(INPUT_DIR):
        if filename.endswith(".pdf"):
            filepath = os.path.join(INPUT_DIR, filename)
            sections = extract_text_from_pdf(filepath)
            for section in sections:
                section["source"] = filename  # track which doc it came from

            top_sections = rank_sections(sections, job_description)
            final_results["metadata"]["input_documents"].append(filename)
            final_results["extracted_sections"].extend(top_sections)

    # Save the result
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    with open(os.path.join(OUTPUT_DIR, "result.json"), "w") as f:
        json.dump(final_results, f, indent=2)

    print("✅ Done! Check output/result.json")

if __name__ == "__main__":
    main()