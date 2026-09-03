from pydantic import BaseModel, model_validator
from typing import Optional, Literal

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

class FeedbackRequest(BaseModel):
    features: PredictRequest
    predicted_age: int
    actual_age: Optional[int] = None
    feedback_type: Literal["very_accurate", "close", "not_accurate"]

    @model_validator(mode='after')
    def validate_feedback(self):
        if self.feedback_type != 'very_accurate' and self.actual_age is None:
            raise ValueError('actual_age is required when feedback_type is not "very_accurate"')
        if self.actual_age is not None and (self.actual_age < 18 or self.actual_age > 89):
            raise ValueError('actual_age must be between 18 and 89')
        return self