import React, { useState } from 'react';
import axios from 'axios';
import '../index.css'; // Importing CSS for styling

const PersonalizedSuggest = () => {
  const [input, setInput] = useState({
    age: 30,
    income: "< ₹20k",
    dependents: "yes",
    goals: ""
  });

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");

  const handleInputChange = (field, value) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setRecommendation("");
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/recommend-insurance-type`, {
        age: input.age,
        income: input.income,
        dependents: input.dependents,
        goals: input.goals.split(',').map(g => g.trim())
      });
      setRecommendation(res.data.recommendation);
    } catch (error) {
      console.error("API error:", error);
      alert("Failed to get recommendation");
    }
    setLoading(false);
  };

  return (
    <div className="card p-5 shadow-lg">
      <h3 className="mb-4 text-center">Personalized Insurance Type Recommender</h3>

      <div className="mb-3">
        <label>Age:</label>
        <input
          type="number"
          className="form-control"
          value={input.age}
          onChange={(e) => handleInputChange("age", +e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="mb-3">
        <label>Income:</label>
        <select
          className="form-select"
          value={input.income}
          onChange={(e) => handleInputChange("income", e.target.value)}
          disabled={loading}
        >
          <option>&lt; ₹20k</option>
          <option>₹20k–50k</option>
          <option>₹50k–1L</option>
          <option>&gt; ₹1L</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Do you have dependents?</label>
        <select
          className="form-select"
          value={input.dependents}
          onChange={(e) => handleInputChange("dependents", e.target.value)}
          disabled={loading}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Your Financial Goals (comma-separated):</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. child education, retirement, tax saving"
          value={input.goals}
          onChange={(e) => handleInputChange("goals", e.target.value)}
          disabled={loading}
        />
      </div>

      <button className="btn btn-lg btn-gradient w-100 border-0 d-flex align-items-center justify-content-center" onClick={handleSubmit} disabled={loading}>
        {loading ? "Recommending..." : "Get Recommendation"}
      </button>

      {recommendation && (
        <div className="alert alert-success mt-4">
          <strong>Recommended Insurance Types:</strong>
          <pre className="mb-0">{recommendation}</pre>
        </div>
      )}
    </div>
  );
};

export default PersonalizedSuggest;