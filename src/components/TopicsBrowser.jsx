import React, { useState } from "react";
import "./TopicBroiwser.css"; // We'll define some two-column styling

export default function TopicBrowser({ topics }) {
  // Keep track of which topic is selected
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  // Find the selected topic object from the array
  const selectedTopic = topics.find((t) => t.id === selectedTopicId);

  return (
    <div className="topic-browser">
      {/* Left column: clickable topic titles */}
      <div className="topic-list-column">
        <h2>Topics</h2>
        <ul className="topic-list">
          {topics.map((topic) => (
            <li
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={topic.id === selectedTopicId ? "active" : ""}
            >
              {topic.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Right column: details of selected topic */}
      <div className="topic-details-column">
        {selectedTopic ? (
          <div className="topic-page">
            <h2>{selectedTopic.title}</h2>
            {selectedTopic.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        ) : (
          <p>Please select a topic from the left.</p>
        )}
      </div>
    </div>
  );
}
