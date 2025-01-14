      import React, { useState } from "react";
import axios from "axios";

function App() {
  const [activityLevel, setActivityLevel] = useState("");
  const [sleepDuration, setSleepDuration] = useState("");
  const [dietQuality, setDietQuality] = useState("");
  const [age, setAge] = useState("");
  const [healthStatus, setHealthStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/predict", {
        activity_level: activityLevel,
        sleep_duration: sleepDuration,
        diet_quality: dietQuality,
        age: age,
      });

      setHealthStatus(response.data.predicted_health_status);
    } catch (error) {
      console.error("Error in health prediction:", error);
    }
  };

  return (
    <div className="App">
      <h1>HealthTrack: Your Personal Health Assistant</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Activity Level (hours/week):
          <input
            type="number"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
          />
        </label>
        <br />
        <label>
          Sleep Duration (hours/night):
          <input
            type="number"
            value={sleepDuration}
            onChange={(e) => setSleepDuration(e.target.value)}
          />
        </label>
        <br />
        <label>
          Diet Quality (1-10):
          <input
            type="number"
            value={dietQuality}
            onChange={(e) => setDietQuality(e.target.value)}
          />
        </label>
        <br />
        <label>
          Age (years):
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Get Health Prediction</button>
      </form>

      {healthStatus !== null && (
        <div>
          <h3>Your Predicted Health Status: {healthStatus === 1 ? 'Healthy' : 'Unhealthy'}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
