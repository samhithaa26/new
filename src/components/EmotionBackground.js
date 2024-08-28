import React from 'react';

const emotionColors = {
  Anger: '#FF4136',
  Disgust: '#B10DC9',
  Fear: '#FF851B',
  Happiness: '#FFDC00',
  Neutral: '#AAAAAA',
  Sadness: '#0074D9',
  Surprise: '#2ECC40',
  Love: '#FF69B4',
};

function EmotionBackground({ emotion }) {
  const backgroundColor = emotionColors[emotion] || '#FFFFFF';

  return (
    <div
      className="emotion-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor,
        opacity: 0.2,
        zIndex: -1,
      }}
    />
  );
}

export default EmotionBackground;