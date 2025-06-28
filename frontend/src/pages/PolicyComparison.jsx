import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

const PolicyComparison = () => {
  const [input, setInput] = useState({
    age: 30,
    income: "< ₹20k",
    type: "any",
    needs: "", // Changed to string for easier input
    riders: "", // Changed to string for easier input
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // New state to track if a search has been attempted


  const handleCompare = async () => {
    setLoading(true);
    setResults([]); // Clear previous results
    setHasSearched(true); // Set search state to true
    try {
    
     
     const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/compare-policies`, input);

      const topResults = res.data.slice(0, 3);
      setResults(topResults);

    } catch (error) {
      console.error("API error:", error);
      alert("Error comparing policies. Please try again later.");
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
    <div className="card p-5 shadow-lg">
      <h3 className="mb-4 text-center">Policy Comparison Tool</h3>

      <div className="row g-3 mb-4">
        <div className="col-md-4 mb-3">
          <label htmlFor="ageInput" className="form-label">Age:</label>
          <input type="number" id="ageInput" className="form-control" value={input.age}
                 onChange={(e) => handleInputChange("age", +e.target.value)}  disabled={loading}/>
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="incomeSelect" className="form-label">Income:</label>
          <select id="incomeSelect" className="form-select" value={input.income}
                  onChange={(e) => handleInputChange("income", e.target.value)} disabled={loading}>
            <option>&lt; ₹20k</option>
            <option>₹20k–50k</option>
            <option>₹50k–1L</option>
            <option>&gt; ₹1L</option>
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="insuranceTypeSelect" className="form-label">Insurance Type:</label>
          <select id="insuranceTypeSelect" className="form-select" value={input.type}
                  onChange={(e) => handleInputChange("type", e.target.value.toLowerCase())}>
            <option value="any">Any</option>
            <option value="term">Term</option>
            <option value="ulip">ULIP</option>
            <option value="health">Health</option>

          </select>
        </div>

        <div className="col-md-6 mb-3">
           <label htmlFor="needsInput" className="form-label">Needs (comma-separated):</label>
          <input type="text" id="needsInput" className="form-control"
                 placeholder="e.g. investment, low premium"
                 onChange={(e) => handleMultiInput("needs", e.target.value)} disabled={loading} />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="ridersInput" className="form-label">Riders (comma-separated):</label>
          <input type="text" id="ridersInput" className="form-control"
                 placeholder="e.g. maternity, cancer cover"
                 onChange={(e) => handleMultiInput("riders", e.target.value)} disabled={loading} />
        </div>
      </div>

      <button className="btn btn-lg btn-gradient w-100 border-0 d-flex align-items-center justify-content-center" onClick={handleCompare} disabled={loading}>
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Comparing...
          </>
        ) : (
          <>
            Compare Policies <i className="bi bi-arrow-right-circle ms-2"></i>
          </>
        )}
      </button>

      {results.length > 0 && (
        <div className="mt-5">
          <h5 className="mb-4 text-center">Found {results.length} matching policy(ies):</h5>
          <div className="row g-4"> 
          {results.map((p, i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <div className="card h-100 p-4">
              <h6 className="card-title text-primary mb-3">{p.name}</h6>
              <ul className="list-unstyled mb-4">
                <li><strong>Type:</strong> {p.type}</li>
                <li><strong>Coverage:</strong> ₹{p.coverage}</li>
                <li><strong>Premium:</strong> ₹{p.premium} / month</li>
                <li><strong>Features:</strong> {p.features?.join(", ") || "N/A"}</li>
                <li><strong>Riders:</strong> {p.riders?.join(", ") || "N/A"}</li>
                <li><strong>Score:</strong> {p.score}%</li>
              </ul>

                <div className="mt-auto">
                <h6 className="text-info mb-1">
                🔐 {p.name} - Trust Level: {p.trust_score || 0}%
                </h6>
                <div className="progress mb-3">
                <div
                    className="progress-bar bg-info"
                    style={{ width: `${p.trust_score || 0}%` }}
                    role="progressbar"
                    aria-valuenow={p.trust_score || 0}
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
                </div>

                <h6 className="text-secondary mb-1">🔍 Suitability Score:</h6> {p.score}%
                <div className="progress">
                <div
                    className="progress-bar bg-secondary"
                    style={{ width: `${p.score}%` }}
                    role="progressbar"
                    aria-valuenow={p.score}
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
                </div>
            </div>
            </div>
            </div>
          ))}
        </div>



      {/* )}
      {results.length > 0 && (
  <> */}
    <h5 className="mt-5 mb-3 text-center">📊 Visual Comparison Table</h5>
    <div className="table-responsive">
    <table className="table table-bordered table-hover mt-2">
      <thead className="table-dark">
        <tr>
          <th>Policy</th>
          <th>Type</th>
          <th>Coverage (₹)</th>
          <th>Premium (₹/mo)</th>
          <th>Trust Score (%)</th>
          <th>Suitability Score (%)</th>
        </tr>
      </thead>
      <tbody>
        {results.map((p, i) => (
          <tr key={i}>
            <td>{p.name}</td>
            <td>{p.type}</td>
            <td>{p.coverage}</td>
            <td>{p.premium}</td>
            <td>{p.trust_score || 0}</td>
            <td>{p.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>
)}
{/* {results.map((p, i) => (
//   <div key={i} className="mb-4">
//     <h6 className="text-primary">
//       🔐 {p.name} - Trust Level: {p.trust_score || 0}%
//     </h6>
//     <div className="progress mb-2">
//       <div
//         className="progress-bar bg-info"
//         style={{ width: `${p.trust_score || 0}%` }}
//         role="progressbar"
//       ></div>
//     </div>

//     <strong>🔍 Suitability Score:</strong> {p.score}%
//     <div className="progress">
//       <div
//         className="progress-bar bg-secondary"
//         style={{ width: `${p.score}%` }}
//         role="progressbar"
//       ></div>
//     </div>
//   </div>
// ))}

//     </div>
//   );
// }; */}

 {/* {results.length === 0 && !loading && (
        <div className="mt-4 alert alert-info text-center">
          No policies found matching your criteria. Try adjusting your selections.
        </div>
      )}
    </div>
  );
}; */}

      {/* Only show "No policies found" if a search has been attempted AND no results were found */}
      {hasSearched && results.length === 0 && !loading && (
        <div className="mt-4 alert alert-info text-center">
          No policies found matching your criteria. Try adjusting your selections.
        </div>
      )}
    </div>
  );
};

export default PolicyComparison;
