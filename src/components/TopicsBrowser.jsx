import React, { useState } from "react";
import "./TopicBrowser.css"; // for styling if needed

export default function TopicBrowser({ topics }) {
  // Keep track of which topic is selected
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  // Keep track of completed topics (an array of IDs)
  const [completedTopics, setCompletedTopics] = useState([]);

  // Find the selected topic object from the array
  const selectedTopic = topics.find((t) => t.id === selectedTopicId);

  // Determine the index of the selected topic (for moving to the next one)
  const selectedIndex = topics.findIndex((t) => t.id === selectedTopicId);

  // Handler when user clicks "Complete Lesson"
  function handleCompleteLesson() {
    if (!selectedTopicId) return;

    // Mark this topic as completed if not already
    if (!completedTopics.includes(selectedTopicId)) {
      setCompletedTopics((prev) => [...prev, selectedTopicId]);
    }

    // Move to the next topic (if it exists)
    const nextIndex = selectedIndex + 1;
    if (nextIndex < topics.length) {
      // Set the next topic as selected
      setSelectedTopicId(topics[nextIndex].id);
    } else {
      // If we're already on the last topic, you could do something else:
      // e.g., alert("All topics completed!") or setSelectedTopicId(null)
      alert("Congratulations! You have completed all topics.");
    }
  }

  return (
    <div className="topic-browser">
      {/* Left column: clickable topic titles */}
      <div className="topic-list-column">
        <h2>Topics</h2>
        <ul className="topic-list">
          {topics.map((topic) => {
            const isCompleted = completedTopics.includes(topic.id);
            const isActive = topic.id === selectedTopicId;

            return (
              <li
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={isActive ? "active" : ""}
              >
                {/* Display checkmark if completed */}
                {isCompleted ? (
                  <span style={{ color: "green", marginRight: "6px" }}>✓</span>
                ) : (
                  <span style={{ marginRight: "14px" }} />
                )}
                {topic.title}
              </li>
            );
          })}
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

            <button onClick={handleCompleteLesson}>Complete Lesson</button>
          </div>
        ) : (
          <p>Please select a topic from the left.</p>
        )}
      </div>
    </div>
  );
}
