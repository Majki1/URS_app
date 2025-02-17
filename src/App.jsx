import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import topicsData from "./data/topicsData.json";
import questionsData from "./data/questionsData.json";

import TopicBrowser from "./components/TopicsBrowser";
import Quiz from "./components/Quiz";
import ProgressBar from "./components/ProgressBar";

import "./App.css"; // or wherever your styles are

function App() {
  // Keep track of which topics are completed in the parent
  const [completedTopics, setCompletedTopics] = useState([]);

  return (
    <Router>
      <div className="container">
        <nav>
          <Link to="/">Home</Link> | <Link to="/topics">Topics</Link> |{" "}
          <Link to="/quiz">Quiz</Link>
        </nav>

        {/* Our new progress bar goes here */}
        <ProgressBar topics={topicsData} completedTopics={completedTopics} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/topics"
            element={
              <TopicBrowser
                topics={topicsData}
                completedTopics={completedTopics}
                setCompletedTopics={setCompletedTopics}
              />
            }
          />
          <Route path="/quiz" element={<Quiz questions={questionsData} />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Embedded Systems Study App</h1>
      <p>Welcome! Select a topic or try a quiz!</p>
    </div>
  );
}

export default App;
