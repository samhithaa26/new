import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Conv1D, MaxPooling1D, Bidirectional, Dropout, Dense, Input, Flatten
from tensorflow.keras.optimizers import Adam
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import pickle
import re

# Load dataset
df = pd.read_excel('C:/Users/SAMHITHA/Desktop/poem-generator/backend/Book1.xlsx')

# Preprocess the data
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
    return text

df['poem content'] = df['poem content'].apply(preprocess_text)
df['label'] = df['label'].map({
    'anger': 'Anger', 'disgust': 'Disgust', 'fear': 'Fear',
    'joy': 'Happiness', 'neutral': 'Neutral', 'sadness': 'Sadness',
    'surprise': 'Surprise', 'Love':'Love'
})
df = df[['poem content', 'label']]

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    df['poem content'], df['label'], test_size=0.2, random_state=42
)

# Tokenize and pad sequences
tokenizer = Tokenizer(num_words=10000)
tokenizer.fit_on_texts(X_train)
X_train_seq = tokenizer.texts_to_sequences(X_train)
X_test_seq = tokenizer.texts_to_sequences(X_test)
X_train_pad = pad_sequences(X_train_seq, maxlen=150)
X_test_pad = pad_sequences(X_test_seq, maxlen=150)

# Encode labels
label_encoder = LabelEncoder()
y_train_encoded = label_encoder.fit_transform(y_train)
y_test_encoded = label_encoder.transform(y_test)

# Define the model
model = Sequential()
model.add(Embedding(input_dim=10000, output_dim=128, input_length=150))
model.add(Conv1D(filters=64, kernel_size=5, activation='relu'))
model.add(MaxPooling1D(pool_size=4))
model.add(Bidirectional(LSTM(128, return_sequences=True)))
model.add(Dropout(0.5))
model.add(LSTM(64))
model.add(Dropout(0.5))
model.add(Dense(len(label_encoder.classes_), activation='softmax'))

model.compile(loss='sparse_categorical_crossentropy', optimizer=Adam(learning_rate=0.001), metrics=['accuracy'])
history = model.fit(X_train_pad, y_train_encoded, epochs=15, validation_data=(X_test_pad, y_test_encoded))

# Save the model and tokenizer
model.save('./backend/emotion_model_advanced.h5')
with open('./backend/tokenizer_advanced.pkl', 'wb') as f:
    pickle.dump(tokenizer, f)
with open('./backend/label_encoder_advanced.pkl', 'wb') as f:
    pickle.dump(label_encoder, f)

print("Model and tokenizer saved successfully.")
