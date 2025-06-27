import React, { useState } from 'react';
import axios from 'axios';

const InsuranceCoach = () => {
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState('English');
  const [mode, setMode] = useState('Simple');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return alert("Please enter a question.");
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/ask-question`, {
        question,
        language,
        mode,
      });
      setAnswer(res.data.answer);
    } catch (error) {
      setAnswer("Error contacting backend.");
    }
    setLoading(false);
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3 className="mb-3">Ask Your Insurance Question</h3>
      <textarea
        className="form-control mb-3"
        rows="4"
        placeholder="e.g., What is surrender value?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <div className="row mb-3">
        <div className="col-md-6">
          <label>Language</label>
          <select className="form-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
          </select>
        </div>
        <div className="col-md-6">
          <label>Explain Mode</label>
          <select className="form-select" value={mode} onChange={(e) => setMode(e.target.value)}>
            <option>Simple</option>
            <option>Detailed</option>
          </select>
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleAsk} disabled={loading}>
        {loading ? "Processing..." : "Get Answer"}
      </button>

      {answer && (
        <div className="alert alert-info mt-4">
          <strong>Answer:</strong>
          <pre className="mb-0">{answer}</pre>
        </div>
      )}
    </div>
  );
};

export default InsuranceCoach;
