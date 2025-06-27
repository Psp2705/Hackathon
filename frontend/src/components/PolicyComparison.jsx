import React, { useState } from 'react';
import axios from 'axios';

const PolicyComparison = () => {
  const [input, setInput] = useState({
    age: 30,
    income: "< ₹20k",
    type: "any",
    needs: [],
    riders: [],
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/compare-policies`, input);
      setResults(res.data);
    } catch (error) {
      console.error("API error:", error);
    }
    setLoading(false);
  };

  const handleInputChange = (field, value) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiInput = (field, value) => {
    setInput(prev => ({ ...prev, [field]: value.toLowerCase().split(',').map(v => v.trim()) }));
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3 className="mb-3">Policy Comparison Tool</h3>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label>Age</label>
          <input type="number" className="form-control" value={input.age}
                 onChange={(e) => handleInputChange("age", +e.target.value)} />
        </div>

        <div className="col-md-4 mb-3">
          <label>Income</label>
          <select className="form-select" value={input.income}
                  onChange={(e) => handleInputChange("income", e.target.value)}>
            <option>&lt; ₹20k</option>
            <option>₹20k–50k</option>
            <option>₹50k–1L</option>
            <option>&gt; ₹1L</option>
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <label>Insurance Type</label>
          <select className="form-select" value={input.type}
                  onChange={(e) => handleInputChange("type", e.target.value.toLowerCase())}>
            <option>Any</option>
            <option>Term</option>
            <option>ULIP</option>
            <option>Health</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label>Needs (comma-separated)</label>
          <input type="text" className="form-control"
                 placeholder="e.g. investment, low premium"
                 onChange={(e) => handleMultiInput("needs", e.target.value)} />
        </div>

        <div className="col-md-6 mb-3">
          <label>Riders (comma-separated)</label>
          <input type="text" className="form-control"
                 placeholder="e.g. maternity, cancer cover"
                 onChange={(e) => handleMultiInput("riders", e.target.value)} />
        </div>
      </div>

      <button className="btn btn-success" onClick={handleCompare} disabled={loading}>
        {loading ? "Comparing..." : "Compare Policies"}
      </button>

      {results.length > 0 && (
        <div className="mt-4">
          <h5>Found {results.length} matching policy(ies):</h5>
          {results.map((p, i) => (
            <div key={i} className="border p-3 mb-3 bg-light rounded">
              <h6>{p.name}</h6>
              <ul className="mb-0">
                <li><strong>Type:</strong> {p.type}</li>
                <li><strong>Coverage:</strong> ₹{p.coverage}</li>
                <li><strong>Premium:</strong> ₹{p.premium} / month</li>
                <li><strong>Features:</strong> {p.features.join(", ")}</li>
                <li><strong>Riders:</strong> {p.riders.join(", ")}</li>
                <li><strong>Score:</strong> {p.score}%</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PolicyComparison;
