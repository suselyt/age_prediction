from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import PredictRequest, PredictResponse
from model.predict import predict_age

app = FastAPI(title="Age Guesser API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# health check endpoint
@app.get("/")
def health_check():
    return {"status": "ok", "message": "Age Guesser API running"}


# prediction endpoint
@app.post("/predict", response_model=PredictResponse)
def predict(request: PredictRequest):
    # convert request to dict
    data = request.model_dump()
    return predict_age(data)