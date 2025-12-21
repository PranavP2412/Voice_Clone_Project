import { useState } from 'react';
import './App.css';
import Header from './Components/header/header.jsx'; // Ensure this path matches where you saved header.jsx

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [userName, setUserName] = useState("");
  const [clonedAudioUrl, setClonedAudioUrl] = useState(null);
  const [clonedBlob, setClonedBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleClone = async (e) => {
    e.preventDefault();
    if (!selectedFile || !textInput) {
      alert("Please upload a voice sample and enter text.");
      return;
    }

    setLoading(true);
    setStatusMessage("✨ AI is analyzing voice patterns and generating audio...");

    const formData = new FormData();
    formData.append('audio_file', selectedFile);
    formData.append('text_input', textInput);

    try {
      const response = await fetch('http://localhost:5000/api/clone', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to clone voice");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      setClonedAudioUrl(url);
      setClonedBlob(blob);
      setStatusMessage("✅ Success! Your cloned voice is ready.");

    } catch (error) {
      console.error(error);
      setStatusMessage("❌ Error: " + error.message);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!clonedBlob || !userName) {
      alert("Please enter a name for this file.");
      return;
    }

    const formData = new FormData();
    formData.append('audio_file', clonedBlob, `${userName}_cloned.wav`);
    formData.append('user_name', userName);

    try {
      const response = await fetch('http://localhost:5000/api/save-audio', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("Audio successfully saved to database!");
      } else {
        alert("Failed to save.");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving file.");
    }
  };

  return (
    <>
    <Header/>
    <div className="container">
      <h1>AI Voice Studio</h1>
      <p style={{color: '#fafbfdff', marginBottom: '30px'}}>Clone any voice in seconds using our advanced AI model.</p>
      
      {/* --- SECTION 1: INPUTS --- */}
      <div className="card">
        <h3>Create New Voice Clone</h3>
        <label>Upload Reference Audio</label>

{/* New Custom File Upload Wrapper */}
<div className="file-upload-wrapper">
  <input 
    type="file" 
    id="audio-upload"
    className="hidden-file-input"
    onChange={(e) => setSelectedFile(e.target.files[0])} 
    accept="audio/*" 
  />
  
  {/* This label acts as the button */}
  <label htmlFor="audio-upload" className="custom-file-button">
    Choose File
  </label>
  
  {/* This shows the file name or placeholder */}
  <span className="file-name-display">
    {selectedFile ? selectedFile.name : "No file chosen"}
  </span>
</div>
        
        <label style={{display:'block', marginBottom:'10px', fontWeight:'500'}}>Text to Speak</label>
        <textarea 
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Type the text you want the AI to speak here..."
          rows="4"
        />
        
        <button onClick={handleClone} disabled={loading}>
          {loading ? "Processing AI Model..." : "Generate Voice Clone"}
        </button>
      </div>

      <p className="status-text">{statusMessage}</p>

      {/* --- SECTION 2: RESULT & SAVE --- */}
      {clonedAudioUrl && (
        <div className="card">
          <h3>2. Result Preview</h3>
          <audio controls src={clonedAudioUrl}></audio>
          
          <div className="save-section">
            <input 
              type="text" 
              placeholder="Name this generation..." 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button onClick={handleSave}>
              Save to Library
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default App;