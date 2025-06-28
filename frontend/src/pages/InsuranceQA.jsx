import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

const InsuranceQA = () => {
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState('English');
  const [mode, setMode] = useState('Simple');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return alert("Please enter a question.");
    setLoading(true);
    setAnswer(''); 
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
    <div className="card p-5 shadow-lg">
      <h4 className="mb-4 text-center">Insurance Q&A (Multilingual)</h4>
      <div className="mb-3">
       <label htmlFor="questionTextarea" className="form-label">Your Question:</label>
      <textarea
        id="questionTextarea"
        className="form-control mb-3"
        placeholder="Ask any insurance-related question..."
        rows={3}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={loading}
      />
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
         <label htmlFor="languageSelect" className="form-label">Select Language:</label>
        <select id="languageSelect" className="form-select mb-3" value={language} onChange={(e) => setLanguage(e.target.value)} disabled={loading}>
        <option value="english">English</option>
        <option value="marathi">Marathi</option>
        <option value="hindi">Hindi</option>
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

      <button className="btn btn-lg btn-gradient w-100 border-0 d-flex align-items-center justify-content-center" onClick={handleAsk} disabled={loading}>
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Processing...
          </>
        ) : (
          <>
            Get Answer <i className="bi bi-arrow-right-circle ms-2"></i>
          </>
        )}
      </button>

      {answer && (
        <div className="alert alert-info mt-4 fade show" role="alert">
          <strong>Answer:</strong>
          <pre className="mb-0 p-2" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{answer}</pre>
        </div>
      )}
    </div>
  );
};

export default InsuranceQA;
