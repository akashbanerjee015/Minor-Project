import os, time, joblib, numpy as np, pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
from sklearn.utils.class_weight import compute_class_weight
from xgboost import XGBClassifier, XGBRegressor

# =========================================================
# PATHS
# =========================================================
DATA_PATH = "../data/resume_dataset.csv"
MODEL_DIR = "../models"
os.makedirs(MODEL_DIR, exist_ok=True)

# =========================================================
# LOAD DATA
# =========================================================
df = pd.read_csv(DATA_PATH).fillna("")

def create_label(score):
    if score < 40:
        return "Poor"
    elif score < 70:
        return "Average"
    return "Good"

df["label"] = df["overall_score"].astype(float).apply(create_label)

# =========================================================
# ENCODER
# =========================================================
encoder = SentenceTransformer("all-MiniLM-L6-v2")
encoder.max_seq_length = 256

def chunk_text(text, size=180):
    words = text.split()
    return [" ".join(words[i:i+size]) for i in range(0, len(words), size)]

def get_embeddings(texts, cache):
    if os.path.exists(cache):
        return np.load(cache)

    all_chunks, mapping = [], []
    for i, t in enumerate(texts):
        chunks = chunk_text(str(t))
        all_chunks.extend(chunks)
        mapping.extend([i] * len(chunks))

    embs = encoder.encode(all_chunks, batch_size=32, show_progress_bar=True)
    df_e = pd.DataFrame(embs)
    df_e["rid"] = mapping
    X = df_e.groupby("rid").max().values
    np.save(cache, X)
    return X

X = get_embeddings(
    df["resume_text"].tolist(),
    f"{MODEL_DIR}/resume_20k_fixed_embeddings.npy"
)

# =========================================================
# CLASSIFICATION
# =========================================================
le = LabelEncoder()
y = le.fit_transform(df["label"])

weights = compute_class_weight("balanced", classes=np.unique(y), y=y)
weight_map = dict(enumerate(weights))
sample_w = np.array([weight_map[i] for i in y])

clf = XGBClassifier(
    n_estimators=300,
    max_depth=7,
    learning_rate=0.07,
    subsample=0.9,
    colsample_bytree=0.9,
    objective="multi:softprob",
    num_class=3,
    eval_metric="mlogloss",
    tree_method="hist"
)

clf.fit(X, y, sample_weight=sample_w)

joblib.dump(
    {"classifier": clf, "label_encoder": le},
    f"{MODEL_DIR}/resume_classifier_20k_fixed.pkl"
)

# =========================================================
# REGRESSION
# =========================================================
targets = [
    "contact_score", "experience_score", "skills_score",
    "education_score", "formatting_score", "overall_score"
]

for t in targets:
    model = XGBRegressor(
        n_estimators=300,
        max_depth=6,
        learning_rate=0.07,
        subsample=0.9,
        colsample_bytree=0.9,
        objective="reg:squarederror",
        tree_method="hist"
    )
    model.fit(X, df[t].astype(float))
    joblib.dump(model, f"{MODEL_DIR}/{t}_model_20k_fixed.pkl")

joblib.dump(encoder, f"{MODEL_DIR}/resume_encoder_20k_fixed.pkl")
print("✅ Training complete. Models saved.")
