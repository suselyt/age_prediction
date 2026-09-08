export interface QuizAnswers {
  bone_density: number;
  vision_sharpness: number;
  hearing_ability: number;
  physical_activity_level: 'Low' | 'Moderate' | 'High';
  smoking_status: 'Former' | 'Current' | 'Never';
  alcohol_consumption: 'None' | 'Occasional' | 'Frequent';
  diet: 'Low-carb' | 'Balanced' | 'Vegetarian' | 'High-fat';
  mental_health_status: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  sleep_patterns: 'Insomnia' | 'Normal' | 'Excessive';
  stress_levels: number;
  income_level: 'Low' | 'Medium' | 'High';
}

export interface PredictResponse {
  predicted_age: number;
  confidence_range: string;
  message: string;
}

export interface FeedbackPayload {
  features: QuizAnswers;
  predicted_age: number;
  actual_age: number | null;
  feedback_type: "very_accurate" | "close" | "not_accurate";
}