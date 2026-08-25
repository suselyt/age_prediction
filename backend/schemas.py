from pydantic import BaseModel

class PredictRequest(BaseModel):
    bone_density: float
    vision_sharpness: float
    hearing_ability: float
    physical_activity_level: str
    smoking_status: str
    alcohol_consumption: str
    diet: str
    mental_health_status: str
    sleep_patterns: str
    stress_levels: float
    income_level: str

class PredictResponse(BaseModel):
    predicted_age: int
    confidence_range: str
    message: str