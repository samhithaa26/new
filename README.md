# Poem Generator App

## Overview

The Poem Generator app is a React-based application that generates poems based on user input and displays them with dynamic background effects and animations. It uses a Flask backend to generate poems and predict emotions, which influence the app's visual and audio elements.

## Features

- **Poem Generation:** Generate poems based on user-provided topics.
- **Dynamic Backgrounds:** Backgrounds change according to the detected emotion.
- **Text-to-Speech:** Poems can be read aloud using speech synthesis.
- **Emoji Animations:** Floating emojis corresponding to different emotions.
- **Responsive Design:** Adaptable layout and styling for various devices.

## Technologies Used

- **Frontend:**
  - React
  - CSS (with animations)
  - Speech Synthesis API

- **Backend:**
  - Flask
  - TensorFlow (for emotion prediction)
  - Groq API (for poem generation)

## Setup

### Prerequisites

- Node.js and npm
- Python and Flask

### Frontend Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/samhithaa26/new.git
    cd poem-generator-app
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the React app:**

    ```bash
    npm start
    ```

4. **Open `http://localhost:3000` in your browser.**

### Backend Setup

1. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2. **Install Python dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

3. **Run the Flask server:**

    ```bash
    python app.py
    ```

4. **Ensure the Flask server is running on `http://localhost:5000`.**

## Code Structure

### Frontend

- **`App.js`:** Main React component for handling state, generating poems, and updating UI based on emotions.
- **`App.css`:** Styles for the app, including animations, backgrounds, and responsive design.

### Backend

- **`app.py`:** Flask server for handling poem generation and emotion prediction.
- **`train.py`:** Script for training the emotion detection model.

## Usage

1. **Enter a topic** into the input field and click "Generate Poem".
2. **View the generated poem** on the screen.
3. **Control audio playback** using the play/stop button.
4. **Observe the dynamic background** and floating emojis that change based on the detected emotion.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please contact [f20210175@hyderabad.bits-pilani.ac.in].

---

Enjoy creating poems and exploring emotions with this dynamic app!
