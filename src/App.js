import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const emojiMap = {
    'Happiness': {
        emoji: '😄',
        color: '#F5DE62',
        designClass: 'sunshine',
        background: "url('https://media.tenor.com/bx7hbOEm4gMAAAAi/sakura-leaves.gif'), url('https://media.tenor.com/JcnKvVi5r0EAAAAi/smiley-emoji.gif') no-repeat left top, url('https://media.tenor.com/2fXmu4tMJQsAAAAi/flowers.gif') repeat-x bottom",
        backgroundSize: '700px,300px,200px,cover',
        additionalClass: 'happy-additional',
        additionalBackground: 'radial-gradient(circle at 50% 50%, #F5DE62, #FFD700, #FFDD59, #FFF700, #F7E7A0, #F9D5A7)',
        additionalBackgroundSize: 'cover'
    },
    'Sadness': {
        emoji: '😢',
        color: '#87CEFA',
        designClass: 'rain',
        background: "url('https://media.tenor.com/dCzXSZxrhVIAAAAi/feeling-sad.gif') no-repeat bottom left fixed, url('https://media.tenor.com/YJiZ9_0LZrwAAAAi/pixel-art-raining.gif')center center fixed, url('https://media.tenor.com/YJiZ9_0LZrwAAAAi/pixel-art-raining.gif')left center fixed",
        backgroundSize: '390px, 200px,200px',
        additionalClass: 'sad-additional',
        additionalBackground: 'radial-gradient(ellipse at center, #87CEFA, #B0E0E6, #4682B4, #6495ED, #1E90FF, #ADD8E6)',
        additionalBackgroundSize: 'cover'
    },
    'Fear': {
        emoji: '😨',
        color: '#B07AB0',
        designClass: 'thunder',
        background: "url('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG11amNpcDN0N250Y3JhNHhyaW9zbjVkbjdicDBmZzl6bzM0dmkzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/2yaEmrad5XSptaNPVi/giphy.webp') no-repeat right top, url('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExajI3cGp2OG1kMTJpYnp0MjVtZmQxazFvenVqcTJjOTMzYzUyeXRhZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/RgiInCqtg4q5ay5m85/giphy.webp') no-repeat left top, url('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExajI3cGp2OG1kMTJpYnp0MjVtZmQxazFvenVqcTJjOTMzYzUyeXRhZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/RgiInCqtg4q5ay5m85/giphy.webp') no-repeat 0%, url('https://media.tenor.com/aYXserCES90AAAAi/huh-terrified.gif') no-repeat left bottom",
        backgroundSize: '900px,800px,800px,200px',
        additionalClass: 'fear-additional',
        additionalBackground: 'conic-gradient(from 180deg, #B07AB0, #8B008B, #6A0DAD, #7B68EE, #4B0082, #483D8B)',
        additionalBackgroundSize: 'cover'
    },
    'Anger': {
        emoji: '😠',
        color: '#FF6307',
        designClass: 'flames',
        background: "url('https://media.tenor.com/YO8uqDXWMO0AAAAi/angry-cat.gif') no-repeat right center fixed, url('https://media.tenor.com/jnyLvpwBKOUAAAAi/fireplace-fire.gif') repeat-x bottom,url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
        backgroundSize: '200px, 200px,400px',
        additionalClass: 'anger-additional',
        additionalBackground: 'radial-gradient(circle at 30% 70%, #FF6307, #FF4500, #FF6347, #FF8C00, #FFB6C1, #FF0000, #FF7F50, #FF6F61)',
        additionalBackgroundSize: 'cover'
    },
    'Disgust': {
        emoji: '🤢',
        color: '#8FBC8F',
        designClass: 'drainage',
        background: "url('https://media.tenor.com/L8vYLNwpCbwAAAAi/amibb-cat.gif') no-repeat right bottom fixed, url('https://media.tenor.com/_0lLc8Qc_M4AAAAi/come-fly-with-me-gotta-fly.gif'),url('https://media.tenor.com/4xsVZ0oEmp4AAAAi/insectosdigitales.gif')no-repeat 17% 30% fixed",
        backgroundSize: '400px,200px,300px',
        additionalClass: 'disgust-additional',
        additionalBackground: 'conic-gradient(from 45deg, #8FBC8F, #556B2F, #6B8E23, #808000, #9ACD32, #2E8B57, #7F9C6F, #4A5D23)',
        additionalBackgroundSize: 'cover'
    },
    'Surprise': {
        emoji: '😮',
        color: '#ec407a',
        designClass: 'confetti',
        background: "url('https://media.tenor.com/fnZ5NMhE0I0AAAAi/confetti.gif') no-repeat left center fixed, url('https://media.tenor.com/fnZ5NMhE0I0AAAAi/confetti.gif') no-repeat right center fixed,url('https://media.tenor.com/w0aU-R4VV9UAAAAi/party-beer.gif')repeat-x top,url('https://media.tenor.com/Cri9ly9IFjMAAAAi/fireworks-color.gif')",
        backgroundSize: '1000px,1000px,200px,250px',
        additionalClass: 'surprise-additional',
        additionalBackground: 'radial-gradient(circle at 50% 50%, #FF1493, #FF69B4, #FFB6C1, #FFD700, #00FFFF, #00CED1, #40E0D0)',
        additionalBackgroundSize: 'cover'
    },
    'Love': {
        emoji: '🩷',
        color: '#FFC0CB',
        designClass: 'flowers',
        gradient: 'linear-gradient(45deg, #FFC0CB, #FFDAB9, #FFE4E1, #FFD700)',
        background: "url('https://media.tenor.com/UQNVseGYRmYAAAAi/puffy-bear-love.gif') no-repeat left center, url('https://media.tenor.com/UQNVseGYRmYAAAAi/puffy-bear-love.gif') no-repeat right center, url('https://media.tenor.com/H3ldQhigflkAAAAi/pixel-flower-cute-pixel.gif')",
        backgroundSize: '250px,250px,250px',
        additionalClass: 'love-additional',
        additionalBackground: 'conic-gradient(from 90deg, #FFC0CB, #FFDAB9, #FFE4E1, #FFD700, #FF69B4, #FFB6C1, #FFD1DC)',
        additionalBackgroundSize: 'cover'
    }
};


function App() {
    const [topic, setTopic] = useState('');
    const [poem, setPoem] = useState('');
    const [emotion, setEmotion] = useState('');
    const [synth] = useState(window.speechSynthesis);
    const [currentUtterance, setCurrentUtterance] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [emojiInterval, setEmojiInterval] = useState(null);
    const additionalBackgroundRef = useRef(null);

    const generatePoem = () => {
        if (topic.trim() === '') {
            setPoem('Please enter a topic to generate a poem.');
            return;
        }

        setPoem('Generating poem...');

        stopEmojis();

        fetch('http://localhost:5000/generate_poem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic: topic }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.poem) {
                    const formattedPoem = data.poem.replace(/,/g, ',\n');
                    displayPoemTokenByToken(formattedPoem);
                    setEmotion(data.emotion);
                    setupAudio(formattedPoem);
                } else {
                    setPoem('Error: ' + (data.error || 'Unknown error'));
                }
            })
            .catch(error => {
                setPoem('Error: ' + error.message);
            });
    };

    const displayPoemTokenByToken = (poemText) => {
        const lines = poemText.split(/\n/).filter(line => line.trim() !== '');
        let displayText = '';
        let totalDelay = 0;
    
        lines.forEach((line, lineIndex) => {
            const lineTokens = line.split(/\s+/);
            lineTokens.forEach((token, tokenIndex) => {
                totalDelay += 100;
                setTimeout(() => {
                    if (tokenIndex === 0 && lineIndex > 0) {
                        displayText += '\n';
                    } else if (tokenIndex > 0) {
                        displayText += ' ';
                    }
                    
                    displayText += token;
                    
                    setPoem(displayText);
                }, totalDelay);
            });
        });
    };

    const updateEmojiBackground = () => {
        const emotionData = emojiMap[emotion];
    
        if (emotionData) {
            const dynamicBackground = document.querySelector('.dynamic-background');
    
            if (dynamicBackground) {
                dynamicBackground.className = `dynamic-background ${emotionData.designClass}`;
                dynamicBackground.style.background = emotionData.background;
                dynamicBackground.style.backgroundSize = emotionData.backgroundSize;
                dynamicBackground.style.animation = 'gradient-animation 15s ease infinite';
            }
            if (additionalBackgroundRef.current) {
                additionalBackgroundRef.current.className = `additional-background ${emotionData.additionalClass}`;
                additionalBackgroundRef.current.style.background = emotionData.additionalBackground;
                // Remove the following line as we're now handling background size in CSS
                // additionalBackgroundRef.current.style.backgroundSize = emotionData.additionalBackgroundSize || 'cover';
                // Remove the following line as we're now handling animation in CSS
                // additionalBackgroundRef.current.style.animation = 'none';
            }
    
            stopEmojis();
    
            const newInterval = setInterval(() => {
                createEmoji(emotionData.emoji);
            }, 80);
            setEmojiInterval(newInterval);
        }
    };

    const stopEmojis = () => {
        if (emojiInterval) {
            clearInterval(emojiInterval);
            setEmojiInterval(null);
        }
        const existingEmojis = document.querySelectorAll('.emoji');
        existingEmojis.forEach(emoji => emoji.remove());
    };

    const setupAudio = (poemText) => {
        if (currentUtterance) {
            synth.cancel();
            setCurrentUtterance(null);
        }

        const utterance = new SpeechSynthesisUtterance(poemText);
        const voices = synth.getVoices();
        const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('Zira') || voice.name.includes('Samantha')) || voices[0];
        utterance.voice = femaleVoice;

        utterance.onend = () => {
            setCurrentUtterance(null);
            setIsPlaying(false);
        };

        setCurrentUtterance(utterance);
    };

    const playPoemAudio = () => {
        if (currentUtterance) {
            synth.speak(currentUtterance);
            setIsPlaying(true);
        }
    };

    const pausePoemAudio = () => {
        if (synth.speaking) {
            synth.cancel();
            setIsPlaying(false);
        }
    };

    const createEmoji = (emoji) => {
        const emojiElement = document.createElement('div');
        emojiElement.className = 'emoji';
        emojiElement.textContent = emoji;
        emojiElement.style.left = `${Math.random() * 100}vw`;
        emojiElement.style.top = `${Math.random() * 100}vh`;
        document.querySelector('.app-container').appendChild(emojiElement);
    
        setTimeout(() => {
            emojiElement.remove();
        }, 10000);
    };

    useEffect(() => {
        updateEmojiBackground();
        return () => stopEmojis(); 
    }, [emotion]);

    return (
        <div className="app-container">
            <div className="dynamic-background"></div>
            <div className="additional-background" ref={additionalBackgroundRef}></div>
            <div className="content-container">
                <h1>Poem Generator</h1>
                <div className="input-container">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter a topic..."
                    />
                    <button className="button" onClick={generatePoem}>Generate Poem</button>
                </div>
                <div className="audio-controls">
                    {isPlaying ? (
                        <button className="audio-button pause" onClick={pausePoemAudio}>⬜</button>
                    ) : (
                        <button className="audio-button" onClick={playPoemAudio}>▶</button>
                    )}
                </div>
                <div className="poem">
                    {poem.split('\n').map((line, index) => (
                        <p key={index} style={{ margin: 0 }}>{line}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;