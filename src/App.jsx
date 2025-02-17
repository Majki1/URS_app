import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import topicsData from "./data/topicsData.json";
import questionsData from "./data/questionsData.json";

import TopicBrowser from "./components/TopicsBrowser";
import Quiz from "./components/Quiz";
import "./App.css"; // global styling

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <Link to="/">Home</Link> | <Link to="/topics">Topics</Link> |{" "}
          <Link to="/quiz">Quiz</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/topics"
            element={<TopicBrowser topics={topicsData} />}
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
