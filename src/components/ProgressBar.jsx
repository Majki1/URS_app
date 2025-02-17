import React, { useState, useEffect } from "react";
import "./ProgressBar.css";

export default function ProgressBar({ topics, completedTopics }) {
  const total = topics.length;
  const completed = completedTopics.length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Track the currently shown milestone
  const [milestone, setMilestone] = useState(null);

  // Track which milestones have already been visited
  const [visitedMilestones, setVisitedMilestones] = useState(new Set());

  useEffect(() => {
    // Check for milestones only if not visited before
    if (percentage >= 50 && percentage < 90 && !visitedMilestones.has("50")) {
      setMilestone("50");
    } else if (percentage >= 90 && !visitedMilestones.has("90")) {
      setMilestone("90");
    }
  }, [percentage, visitedMilestones]);

  function handleClose() {
    // Mark milestone as visited
    setVisitedMilestones((prev) => new Set([...prev, milestone]));
    // Close the modal
    setMilestone(null);
  }

  // Messages and gifs for milestones
  const milestoneMessages = {
    50: {
      message: "You're halfway there! Keep it up! 😸",
      gif: "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
    },
    90: {
      message: "Almost at the finish line! Just a little more! 🐾",
      gif: "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
    },
  };

  return (
    <div>
      {/* Progress Bar Display */}
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }}>
          {percentage}%
        </div>
      </div>

      {/* Milestone Popup */}
      {milestone && milestoneMessages[milestone] && (
        <div className="milestone-popup">
          <div className="milestone-content">
            <h3>{milestoneMessages[milestone].message}</h3>
            <img
              src={milestoneMessages[milestone].gif}
              alt="Motivational Cat"
              className="cat-gif"
            />
            <button onClick={handleClose}>Thanks! Let's Continue! 😸</button>
          </div>
        </div>
      )}
    </div>
  );
}
