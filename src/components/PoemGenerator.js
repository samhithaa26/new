import React, { useState } from 'react';
import EmotionBackground from './EmotionBackground';
import AudioControls from './AudioControls';
import axios from 'axios';


function PoemGenerator() {
  const [topic, setTopic] = useState('');
  const [poem, setPoem] = useState('');
  const [emotion, setEmotion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generatePoem = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/generate_poem', { topic });
      setPoem(response.data.poem);
      setEmotion(response.data.emotion);
    } catch (error) {
      console.error('Error generating poem:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="poem-generator">
      <h1>AI Poem Generator</h1>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic for your poem"
      />
      <button onClick={generatePoem} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Poem'}
      </button>
      {poem && (
        <div className="poem-result">
          <EmotionBackground emotion={emotion} />
          <h2>Generated Poem:</h2>
          <pre>{poem}</pre>
          <p>Detected Emotion: {emotion}</p>
          <AudioControls text={poem} />
        </div>
      )}
    </div>
  );
}

export default PoemGenerator;