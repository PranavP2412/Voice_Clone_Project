import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Prepare the data to send
    const formData = new FormData();
    formData.append('audio_file', selectedFile);
    formData.append('text_input', textInput); 

    try {
      // 2. Send to Flask
      const response = await fetch('http://localhost:5000/api/clone', {
        method: 'POST',
        body: formData, // No headers needed, FormData handles it automatically
      });

      if (response.ok) {
        // 3. Convert response to playable audio
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } else {
        console.error("Failed to clone voice");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Voice Cloning Tool</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          onChange={(e) => setSelectedFile(e.target.files[0])} 
          accept="audio/*" 
        />
        <input 
          type="text" 
          value={textInput} 
          onChange={(e) => setTextInput(e.target.value)} 
          placeholder="What should the voice say?" 
        />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Clone Voice"}
        </button>
      </form>

      {/* 4. Play the result */}
      {audioUrl && (
        <div>
          <h3>Result:</h3>
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  );
}

export default App;