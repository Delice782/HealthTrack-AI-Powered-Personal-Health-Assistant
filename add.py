from flask import Flask, request, jsonify
import numpy as np
import pickle

app = Flask(__name__)

# Load pre-trained AI health prediction model
with open('models/health_predict_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/')
def home():
    return "Welcome to the HealthTrack API!"

@app.route('/predict', methods=['POST'])
def predict_health_status():
    try:
        data = request.get_json()

        # Extract input features
        activity_level = data['activity_level']  # in hours per week
        sleep_duration = data['sleep_duration']  # in hours per night
        diet_quality = data['diet_quality']  # scale 1-10
        age = data['age']  # in years

        # Prepare input for prediction (features)
        features = np.array([[activity_level, sleep_duration, diet_quality, age]])

        # Make prediction for health status
        health_status = model.predict(features)

        return jsonify({'predicted_health_status': health_status[0]})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
