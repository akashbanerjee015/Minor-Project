from huggingface_hub import HfApi
import os, shutil, textwrap

SPACE_ID = "Akash150/resume-analyzer-fastapi"

MODEL_MAP = {
    "../models/resume_encoder_20k_fixed.pkl": "resume_encoder.pkl",
    "../models/contact_score_model_20k_fixed.pkl": "contact_score_model.pkl",
    "../models/experience_score_model_20k_fixed.pkl": "experience_score_model.pkl",
    "../models/skills_score_model_20k_fixed.pkl": "skills_score_model.pkl",
    "../models/education_score_model_20k_fixed.pkl": "education_score_model.pkl",
    "../models/formatting_score_model_20k_fixed.pkl": "formatting_score_model.pkl",
    "../models/overall_score_model_20k_fixed.pkl": "overall_score_model.pkl",
}

if os.path.exists("hf_space"):
    shutil.rmtree("hf_space")

os.makedirs("hf_space/models", exist_ok=True)

for src, dst in MODEL_MAP.items():
    shutil.copy(src, f"hf_space/models/{dst}")

with open("hf_space/app.py", "w") as f:
    f.write(textwrap.dedent("""
    from fastapi import FastAPI, UploadFile, File
    import pdfplumber, joblib, numpy as np

    app = FastAPI()
    encoder = joblib.load("models/resume_encoder.pkl")

    models = {
        "contact": joblib.load("models/contact_score_model.pkl"),
        "experience": joblib.load("models/experience_score_model.pkl"),
        "skills": joblib.load("models/skills_score_model.pkl"),
        "education": joblib.load("models/education_score_model.pkl"),
        "formatting": joblib.load("models/formatting_score_model.pkl"),
        "overall": joblib.load("models/overall_score_model.pkl")
    }

    def chunk_text(text, size=180):
        w = text.split()
        return [" ".join(w[i:i+size]) for i in range(0, len(w), size)]

    @app.post("/predict-pdf")
    async def predict_pdf(file: UploadFile = File(...)):
        text = ""
        with pdfplumber.open(file.file) as pdf:
            for p in pdf.pages:
                if p.extract_text():
                    text += p.extract_text()

        chunks = chunk_text(text)
        emb = encoder.encode(chunks)
        X = np.max(emb, axis=0).reshape(1, -1)

        return {k: int(v.predict(X)[0]) for k, v in models.items()}
    """))

with open("hf_space/requirements.txt", "w") as f:
    f.write("fastapi\nuvicorn\npdfplumber\nsentence-transformers\njoblib\nxgboost\ntorch\n")

api = HfApi()
api.create_repo(repo_id=SPACE_ID, repo_type="space", space_sdk="docker", exist_ok=True)
api.upload_folder("hf_space", repo_id=SPACE_ID, repo_type="space")

print("🚀 Deployment complete")
