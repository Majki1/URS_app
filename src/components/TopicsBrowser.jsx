import React, { useState } from "react";
import "./TopicBrowser.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function TopicBrowser({
  topics,
  completedTopics,
  setCompletedTopics,
  edit_1,
}) {
  // Keep track of which topic is selected
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  // The topic currently displayed on the right
  const selectedTopic = topics.find((t) => t.id === selectedTopicId);

  // Find index of the selected topic so we can move to the next
  const selectedIndex = topics.findIndex((t) => t.id === selectedTopicId);

  // Check if current topic is completed
  const isCompleted =
    selectedTopicId && completedTopics.includes(selectedTopicId);

  function handleCompleteLesson() {
    if (!selectedTopicId) return;

    // If not already completed, add it
    if (!isCompleted) {
      setCompletedTopics((prev) => [...prev, selectedTopicId]);
    }

    // Move to next topic if possible
    const nextIndex = selectedIndex + 1;
    if (nextIndex < topics.length) {
      setSelectedTopicId(topics[nextIndex].id);
    } else {
      alert("Congratulations! You have completed all topics.");
    }
  }

  function handleRevisitLesson() {
    if (!selectedTopicId) return;

    // Remove from completed topics
    if (isCompleted) {
      setCompletedTopics((prev) => prev.filter((id) => id !== selectedTopicId));
    }
    // We stay on the same topic, no jump to next
  }

  return (
    <div className="topic-browser">
      {/* Left column: clickable topic titles */}
      <div className="topic-list-column">
        <h2>Topics</h2>
        <ul className="topic-list">
          {topics.map((topic) => {
            const itemIsCompleted = completedTopics.includes(topic.id);
            const isActive = topic.id === selectedTopicId;

            return (
              <li
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={isActive ? "active" : ""}
              >
                {/* Display checkmark if completed */}
                {itemIsCompleted ? (
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
              <ReactMarkdown key={idx} remarkPlugins={[remarkGfm]}>
                {para}
              </ReactMarkdown>
            ))}

            {/* Conditionally render buttons */}
            {isCompleted ? (
              <button onClick={handleRevisitLesson}>Revisit Lesson</button>
            ) : (
              <button onClick={handleCompleteLesson}>Complete Lesson</button>
            )}
          </div>
        ) : (
          <p>Please select a topic from the left.</p>
        )}
      </div>
    </div>
  );
}
