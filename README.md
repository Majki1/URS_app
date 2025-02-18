# Universal Study App

## Overview

This app supports multiple subjects by using separate JSON files for topics and questions. Users can choose a subject from a dropdown and explore subject-specific topics and quizzes.

To use it simply pass your course material to an LLM with file reading capabilities and generate jsons as given in examples below, then follow the instructions to add a new subject.

### Cloning and Starting the App

To clone the repository and start the application locally:

1. **Clone the repository:**
   ```bash
   git clone git@github.com:Majki1/URS_app.git
   cd URS_app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **View the app:** Open your browser and visit `http://localhost:5173`

Ensure Node.js and npm are installed on your system before running the commands.

## Adding a New Subject

1. **Create JSON Files for Topics and Questions:**\
   Example: `cs_topics.json`, `cs_questions.json`

   Remember to mention to the LLM of your choosing to format content for markdown

2. **Remove the current files and put them in legacy for others**
3. **Add yours in the data folder**
4. **Make sure to update imports in App.jsx for the jsons**

## JSON Format

### Topics

```json
[
  {
    "id": "topic_id",
    "title": "Topic Title",
    "summary": "Brief overview of the topic.",
    "content": ["Detail 1", "Detail 2"]
  }
]
```

### Questions

```json
[
  {
    "id": "question_id",
    "topicId": "related_topic_id",
    "questionText": "What is...?",
    "options": ["Option A", "Option B"],
    "correctAnswer": "Option A"
  }
]
```

## Future Improvements

- Implement local storage for progress tracking.
- Add user accounts for personalized experiences.
- Enable multimedia support in topics.
