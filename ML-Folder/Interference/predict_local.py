import joblib, numpy as np, pdfplumber, docx

MODEL_DIR = "../models"
RESUME_PATH = "../resumes/sample_resume.pdf"

def extract_text(path):
    if path.endswith(".pdf"):
        text = ""
        with pdfplumber.open(path) as pdf:
            for p in pdf.pages:
                if p.extract_text():
                    text += p.extract_text() + "\n"
        return text
    if path.endswith(".docx"):
        return "\n".join(p.text for p in docx.Document(path).paragraphs)
    return open(path, "r", encoding="utf-8").read()

def chunk_text(text, size=180):
    words = text.split()
    return [" ".join(words[i:i+size]) for i in range(0, len(words), size)]

encoder = joblib.load(f"{MODEL_DIR}/resume_encoder_20k_fixed.pkl")
text = extract_text(RESUME_PATH)
chunks = chunk_text(text)

embs = encoder.encode(chunks)
X = np.max(embs, axis=0).reshape(1, -1)

targets = [
    "contact_score", "experience_score", "skills_score",
    "education_score", "formatting_score", "overall_score"
]

print("\n📄 Resume Analysis\n")
for t in targets:
    model = joblib.load(f"{MODEL_DIR}/{t}_model_20k_fixed.pkl")
    score = int(round(model.predict(X)[0]))
    print(f"{t.replace('_',' ').title()}: {score}%")
