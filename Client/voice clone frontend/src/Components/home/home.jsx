import { useState } from 'react';
import './home.css';

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userName, setUserName] = useState("");
  const [clonedAudioUrl, setClonedAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleClone = async (e) => {
    e.preventDefault();

    // 1. Check if file exists
    if (!selectedFile) {
      alert("Please upload a voice sample.");
      return;
    }

    // 2. UPDATED VALIDATION: Allow both MP3 and WAV
    const validTypes = ['.mp3', '.wav'];
    const fileExtension = selectedFile.name.toLowerCase().slice(selectedFile.name.lastIndexOf('.'));
    
    if (!validTypes.includes(fileExtension)) {
      alert("Invalid file type. Please upload an MP3 or WAV file.");
      return;
    }

    setLoading(true);
    setStatusMessage("AI is analyzing voice patterns...");

    const formData = new FormData();
    formData.append('audio_file', selectedFile);

    try {
      // NOTE: Make sure this URL matches your backend route prefix!
      // If you used 'api/voice' in __init__.py, use that here.
      const response = await fetch('http://localhost:5000/api/voice/clone', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to process audio");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setClonedAudioUrl(url);
      setStatusMessage("✅ Success! Audio processing complete.");

    } catch (error) {
      console.error(error);
      setStatusMessage("❌ Error: " + error.message);
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (!clonedAudioUrl) return;

    const link = document.createElement("a");
    link.href = clonedAudioUrl;
    const safeName = userName.trim() || "cloned_voice";
    link.download = `${safeName}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="container">
        <h1>AI Voice Studio</h1>
        <p style={{ color: '#fafbfdff', marginBottom: '30px' }}>
          Upload a voice sample (MP3 or WAV) for AI processing.
        </p>

        <div className="card">
          <h3>Upload Voice Sample</h3>
          <label>Reference Audio</label>
          <br />

          <div className="file-upload-wrapper">
            <input
              type="file"
              id="audio-upload"
              className="hidden-file-input"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              // 3. UPDATED ACCEPT ATTRIBUTE
              accept=".mp3,audio/mpeg,.wav,audio/wav" 
            />

            <label htmlFor="audio-upload" className="custom-file-button">
              Choose Audio File
            </label>

            <span className="file-name-display">
              {selectedFile ? selectedFile.name : "No file chosen"}
            </span>
          </div>

          <button onClick={handleClone} disabled={loading} style={{ marginTop: '20px' }}>
            {loading ? "Processing..." : "Upload & Process Audio"}
          </button>
        </div>

        <p className="status-text">{statusMessage}</p>

        {clonedAudioUrl && (
          <div className="card">
            <h3>Result Preview</h3>
            <audio controls src={clonedAudioUrl}></audio>

            <div className="save-section">
              <input
                type="text"
                placeholder="Name this file..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <button onClick={handleDownload} style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
                ⬇ Download Audio
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;