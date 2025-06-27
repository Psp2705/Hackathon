import React, { useState } from "react";
import InsuranceCoach from "./components/InsuranceCoach";
import PolicyComparison from "./components/PolicyComparison";

function App() {
  const [tab, setTab] = useState("coach");

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary mb-4">🛡️ InsureWise</h1>

      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn btn-outline-primary mx-2 ${tab === "coach" && "active"}`}
          onClick={() => setTab("coach")}
        >
          Insurance Q&A
        </button>
        <button
          className={`btn btn-outline-success mx-2 ${tab === "compare" && "active"}`}
          onClick={() => setTab("compare")}
        >
          Policy Comparison
        </button>
      </div>

      {tab === "coach" ? <InsuranceCoach /> : <PolicyComparison />}
    </div>
  );
}

export default App;
