import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/ask-question`,
      {
        question,
        language: "english",
        mode: "Simple"
      }
    );
    setResponse(res.data.answer);
  };

  return (
    <div className="container">
      <h2>Insurance Coach</h2>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask your insurance question..."
      />
      <button onClick={handleAsk}>Ask</button>

      {response && (
        <div className="answer">
          <h4>Answer:</h4>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
