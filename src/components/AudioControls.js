import React, { useState, useEffect } from 'react';

function AudioControls({ text }) {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text);
      setAudio(utterance);
    }
  }, [text]);

  const playAudio = () => {
    if (audio) {
      window.speechSynthesis.speak(audio);
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="audio-controls">
      <button onClick={playAudio} disabled={isPlaying}>
        Play
      </button>
      <button onClick={pauseAudio} disabled={!isPlaying}>
        Pause
      </button>
      <button onClick={stopAudio}>Stop</button>
    </div>
  );
}

export default AudioControls;