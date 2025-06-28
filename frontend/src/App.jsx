import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PolicyComparison from "./pages/PolicyComparison";
import InsuranceQA from "./pages/InsuranceQA";
import PersonalizedSuggest from "./pages/PersonalizedSuggest";
import ScenarioSimulator from "./pages/ScenarioSimulator";
import Navbar from './components/Navbar'; // Optional if using a nav


function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("bg-dark", "text-light");
      document.body.classList.remove("bg-light", "text-dark");
    } else {
      document.body.classList.add("bg-light", "text-dark");
      document.body.classList.remove("bg-dark", "text-light");
    }
  }, [dark]);
  
  return (
    <Router>
      <div className={`min-vh-100 ${dark ? "bg-dark text-light" : "bg-light text-dark"}`}>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom">
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">🛡️ InsureGuide</Link>
             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Insurance Q&A</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/compare">Policy Comparison</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/recommend">Smart Suggestion</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/simulate">What-if Simulator</Link>
                </li>
                <li className="nav-item ms-lg-3"> {/* Margin for spacing on larger screens */}
                  <button className="btn btn-sm btn-outline-light" onClick={() => setDark(!dark)}>
                    {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>


        {/* Page Content */}
        <div className="container py-5">
          <Routes>
            <Route path="/" element={<InsuranceQA />} />
            <Route path="/compare" element={<PolicyComparison />} />
            <Route path="/recommend" element={<PersonalizedSuggest />} /> {/* ✅ New route */}
            <Route path="/simulate" element={<ScenarioSimulator />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;



// import React, { useState } from "react";
// import InsuranceCoach from "./components/InsuranceCoach";
// import PolicyComparison from "./components/PolicyComparison";

// function App() {
//   const [tab, setTab] = useState("coach");

//   return (
//     <div className="container mt-4">
//       <h1 className="text-center text-primary mb-4">🛡️ InsureWise</h1>

//       <div className="d-flex justify-content-center mb-4">
//         <button
//           className={`btn btn-outline-primary mx-2 ${tab === "coach" && "active"}`}
//           onClick={() => setTab("coach")}
//         >
//           Insurance Q&A
//         </button>
//         <button
//           className={`btn btn-outline-success mx-2 ${tab === "compare" && "active"}`}
//           onClick={() => setTab("compare")}
//         >
//           Policy Comparison
//         </button>
//       </div>

//       {tab === "coach" ? <InsuranceCoach /> : <PolicyComparison />}
//     </div>
//   );
// }

// export default App;
