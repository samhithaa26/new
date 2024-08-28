import os
from groq import Groq
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences

os.environ['GROQ_API_KEY'] = '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'

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model and tokenizer
model_path = './backend/emotion_model_advanced.h5'
tokenizer_path = './backend/tokenizer_advanced.pkl'
label_encoder_path = './backend/label_encoder_advanced.pkl'

try:
    model = tf.keras.models.load_model(model_path)
    with open(tokenizer_path, 'rb') as f:
        tokenizer = pickle.load(f)
    with open(label_encoder_path, 'rb') as f:
        label_encoder = pickle.load(f)
except FileNotFoundError as e:
    print(f"Error loading model files: {e}")
    exit(1)

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

@app.route('/generate_poem', methods=['POST'])
def generate_poem():
    topic = request.json.get('topic')
    if not topic:
        return jsonify({"error": "Topic is required"}), 400

    try:
        # Generate poem
        poem_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a poetic assistant, skilled in creating poems."},
                {"role": "user", "content": f"Generate a meaningful very short poem about {topic}"}
            ],
            model="mixtral-8x7b-32768",
            temperature=0.7,
            max_tokens=2048,
            top_p=1,
            stop=None,
            stream=False
        )
        
        poem = poem_completion.choices[0].message.content
        
        # Prepare text for prediction
        poem_seq = tokenizer.texts_to_sequences([poem])
        poem_pad = pad_sequences(poem_seq, maxlen=150)  

        # Predict emotion
        prediction = model.predict(poem_pad)
        emotion_index = np.argmax(prediction)
        emotion = label_encoder.inverse_transform([emotion_index])[0]

        return jsonify({"poem": poem, "emotion": emotion})
        
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while generating the poem"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Explicitly set the port