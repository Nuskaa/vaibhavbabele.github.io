import React, { useState } from "react";
import axios from "axios";
import "./../public/styles.css";

function App() {
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFeedback("");
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Choose a resume file first!");
      return;
    }
    setLoading(true);
    setFeedback("");
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        "http://localhost:8000/analyze-resume/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setFeedback(res.data.feedback);
    } catch {
      setError("An error occurred during upload or analysis.");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="header">
        <img src="logo.png" style={{ width: 60, marginBottom: 10 }} alt="logo" />
        <h1>Nitra Mitra Resume Analyzer</h1>
        <p>Get instant AI feedback—skills, improvements, and role suggestions!</p>
      </div>
      <div className="container">
        <div className="upload-box">
          <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
          <br />
          <button onClick={handleUpload} disabled={loading}>
            {loading ? "Analyzing..." : "Upload & Analyze"}
          </button>
        </div>
        {error && <div style={{ color: "#FF4C60", textAlign: "center" }}>{error}</div>}
        {feedback && (
          <div className="feedback-panel">
            <h3>AI Feedback</h3>
            <div dangerouslySetInnerHTML={{ __html: feedback.replace(/\n/g,'<br/>') }} />
          </div>
        )}
      </div>
      <div className="footer">
        &copy; {new Date().getFullYear()} Nitra Mitra Resume Analyzer
      </div>
    </div>
  );
}
export default App;
