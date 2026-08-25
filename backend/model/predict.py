from pathlib import Path
import json
import joblib
import numpy as np

# load the model and encoders
models_dir = Path(__file__).parent.parent.parent / 'ml' / 'models'
model_path = models_dir / 'age_model_v1.joblib'
label_encoder_path = models_dir / 'label_encoders_v1.joblib'
model_metadata_path = models_dir / 'model_metadata_v1.json'

model = joblib.load(model_path)
label_encoder = joblib.load(label_encoder_path)
metadata = json.loads(Path(model_metadata_path).read_text(encoding='utf-8'))

# dict with ordinal encoding
ordinal_dict = metadata['ordinal_maps']
nominal_dict = metadata['nominal_cols']
features = metadata['feature_names']

def preprocess_input(data: dict) -> np.ndarray:
    '''
    Takes a dict of data to obtain the encoded value for the columns that were encoded.
    Returns a np array with all the features decoded.
    '''
    encoded_features = []
    for column in features:
        value = data[column]
        if column in ordinal_dict:
            encoded_value = ordinal_dict[column][value]
        elif column in nominal_dict:
            encoded_value = label_encoder[column].transform([value])[0]
        else:
            encoded_value = value
        encoded_features.append(encoded_value)
    return np.array([encoded_features])

def predict_age(data: dict) -> dict:
    features_array = preprocess_input(data)
    predicted_age = model.predict(features_array)[0]
    confidence_range = f"{int(predicted_age - 5)} - {int(predicted_age + 5)}"
    message = f"Based on your lifestyle, you appear to be around {int(predicted_age)} years old"
    return {
        "predicted_age": int(predicted_age),
        "confidence_range": confidence_range,
        "message": message
    }