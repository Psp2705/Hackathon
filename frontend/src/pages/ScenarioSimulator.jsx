import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

const ScenarioSimulator = () => {
  const [scenario, setScenario] = useState('');
  const [age, setAge] = useState(30);
  const [insuranceTypes, setInsuranceTypes] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    if (!scenario || !insuranceTypes) {
      alert("Please select a scenario and enter your insurance type.");
      return;
    }

    setLoading(true);
    setResponse('');

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/simulate-scenario`, {
        age,
        insurance: insuranceTypes,
        scenario,
      });

      setResponse(res.data.answer);
    } catch (err) {
      setResponse("An error occurred.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">🔍 What-if Scenario Simulation</h4>

      <div className="mb-3">
        <label>Your Age:</label>
        <input
          type="number"
          className="form-control"
          value={age}
          onChange={(e) => setAge(+e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Insurance Type(s) You Have:</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g., term, health"
          value={insuranceTypes}
          onChange={(e) => setInsuranceTypes(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Simulate a Scenario:</label>
        <select
          className="form-select"
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
        >
          <option value="">-- Select Scenario --</option>
          <option value="job loss">Job Loss</option>
          <option value="hospitalization">Hospitalization</option>
          <option value="critical illness">Critical Illness</option>
        </select>
      </div>

      <button className="btn btn-lg btn-gradient w-100 border-0 d-flex align-items-center justify-content-center" onClick={handleSimulate} disabled={loading}>
        {loading ? "Simulating..." : "Simulate"}
      </button>

      {response && (
        <div className="alert alert-info mt-4">
          <strong>Gemini Response:</strong>
          <pre className="mb-0">{response}</pre>
        </div>
      )}
    </div>
  );
};

export default ScenarioSimulator;
