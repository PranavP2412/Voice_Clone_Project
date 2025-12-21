import { useState } from 'react';
import './App.css'; // Keep your existing styling if you have any
import Header from './Components/header/header';

function App() {
  // State for input
  const [selectedFile, setSelectedFile] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [userName, setUserName] = useState("");

  // State for results
  const [clonedAudioUrl, setClonedAudioUrl] = useState(null);
  const [clonedBlob, setClonedBlob] = useState(null); // We need this to save the file later
  
  // State for UI
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // --- FUNCTION 1: CLONE THE VOICE ---
  const handleClone = async (e) => {
    e.preventDefault();
    if (!selectedFile || !textInput) {
      alert("Please provide both a voice sample and text.");
      return;
    }

    setLoading(true);
    setStatusMessage("AI is processing... this might take a moment.");

    const formData = new FormData();
    formData.append('audio_file', selectedFile);
    formData.append('text_input', textInput);

    try {
      // Note: In Vite, we point directly to the Flask port
      const response = await fetch('http://localhost:5000/api/clone', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to clone voice");

      // Convert result to a playable Blob
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      setClonedAudioUrl(url);
      setClonedBlob(blob); // Save blob state so we can upload it next
      setStatusMessage("Voice cloned successfully! Listen below.");

    } catch (error) {
      console.error(error);
      setStatusMessage("Error: " + error.message);
    }
    setLoading(false);
  };

  // --- FUNCTION 2: SAVE TO MONGODB ---
  const handleSave = async () => {
    if (!clonedBlob || !userName) {
      alert("Please enter a User Name and ensure audio is generated.");
      return;
    }

    const formData = new FormData();
    // We send the 'clonedBlob' we got from the AI, giving it a filename
    formData.append('audio_file', clonedBlob, `${userName}_cloned.wav`);
    formData.append('user_name', userName);

    try {
      const response = await fetch('http://localhost:5000/api/save-audio', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("Audio saved to database!");
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
    <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>AI Voice Cloner</h1>
      
      {/* --- SECTION 1: INPUTS --- */}
      <div className="card">
        <h3>1. Upload & Text</h3>
        <input 
          type="file" 
          onChange={(e) => setSelectedFile(e.target.files[0])} 
          accept="audio/*" 
          style={{ display: 'block', margin: '10px auto' }}
        />
        <textarea 
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="What should the cloned voice say?"
          rows="4"
          cols="50"
          style={{ width: '80%', padding: '10px' }}
        />
        <br />
        <button onClick={handleClone} disabled={loading} style={{ marginTop: '10px' }}>
          {loading ? "Processing..." : "Generate Voice"}
        </button>
      </div>

      <p>{statusMessage}</p>

      {/* --- SECTION 2: RESULT & SAVE --- */}
      {clonedAudioUrl && (
        <div className="card" style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px' }}>
          <h3>2. Result</h3>
          <audio controls src={clonedAudioUrl} style={{ width: '100%' }}></audio>
          
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px dashed #666' }}>
            <h4>Save this result?</h4>
            <input 
              type="text" 
              placeholder="Enter User Name" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ marginRight: '10px', padding: '5px' }}
            />
            <button onClick={handleSave} style={{ backgroundColor: '#4CAF50', color: 'white' }}>
              Save to Database
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default App;