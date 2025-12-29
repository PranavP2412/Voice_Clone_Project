import { useState } from 'react';
import './home.css';
import Box from '../features/box/box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faAnchorLock, faFileArrowUp, faDownload } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userName, setUserName] = useState("");
  const [clonedAudioUrl, setClonedAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // --- NEW: Language State ---
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Hindi");

  const languages = ["English", "Marathi", "Gujrati", "Hindi"];

  const handleClone = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please upload a voice sample.");
      return;
    }

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
    formData.append('source_lang', sourceLang);
    formData.append('target_lang', targetLang);

    try {
      const response = await fetch('http://localhost:5000/api/voice/clone', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to process audio");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setClonedAudioUrl(url);
      setStatusMessage("Success! Audio processing complete.");

    } catch (error) {
      console.error(error);
      setStatusMessage("Error: " + error.message);
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
          
          {/* --- NEW: Language Selection Row --- */}
          <div className="language-row">
            <div className="input-group">
              <label>From</label>
              <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>To</label>
              <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                {languages.map((lang) => {
                  if(lang == sourceLang){
                    return null;
                  }
                  return <option key={lang} value={lang}>{lang}</option>
                })}
              </select>
            </div>
          </div>

          <h3>Upload Voice Sample</h3>
          <label>Reference Audio</label>
          <br />

          <div className="file-upload-wrapper">
            <input
              type="file"
              id="audio-upload"
              className="hidden-file-input"
              onChange={(e) => setSelectedFile(e.target.files[0])}
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
            {loading ? "Processing..." : "Upload Audio"}
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
                Download Audio
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="features-grid">
          <Box 
            icon={<FontAwesomeIcon icon={faRocket} />} 
            title="Fast Processing" 
            description="Generate realistic voice clones in seconds with high-speed AI processing." 
          />
          <Box 
            icon={<FontAwesomeIcon icon={faAnchorLock} />} 
            title="Secure Storage" 
            description="Your uploads are processed securely and deleted immediately after use." 
          />
          <Box 
            icon={<FontAwesomeIcon icon={faFileArrowUp} />} 
            title="High Quality" 
            description="Enjoy crystal clear, uncompressed 44.1kHz studio-quality audio." 
          />
          <Box 
            icon={<FontAwesomeIcon icon={faDownload} />} 
            title="Instant Export" 
            description="Download high-fidelity WAV files instantly for use in any project." 
          />
      </div>
    </>
  );
}

export default Home;