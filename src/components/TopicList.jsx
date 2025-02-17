import React from "react";
import { Link } from "react-router-dom";

export default function TopicList({ topics }) {
  return (
    <div>
      <h2>Topics</h2>
      <ul className="topic-list">
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link to={`/topic/${topic.id}`}>{topic.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
