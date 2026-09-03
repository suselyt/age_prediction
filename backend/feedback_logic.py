import os, csv
from datetime import datetime
from schemas import FeedbackRequest

def save_feedback(data: FeedbackRequest):
    '''
    Saves the feedback obtained from the user from the results page to understand if the result was accurate or not.
    Receives the 11 features, predicted age, actual age and feedback type.
    Returns a dict with status and message.
    '''
    try:
        user_responses_path = os.path.join(os.path.dirname(__file__), "..", "data", "feedback", "user_responses.csv")

        row = {
            "timestamp": datetime.now().isoformat(),
            **data.features.model_dump(),
            "predicted_age": data.predicted_age,
            "actual_age": data.actual_age if data.actual_age is not None else "",
            "feedback_type": data.feedback_type
        }

        file_exists = os.path.exists(user_responses_path)
        with open(user_responses_path, 'a', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=row.keys())
            if not file_exists:
                writer.writeheader()
            writer.writerow(row)

        return {"status": "success", "message": "Thanks for your feedback!"}
    except Exception as e:
        raise RuntimeError(f"Failed to save feedback: {str(e)}") from e