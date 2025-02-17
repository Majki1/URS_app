import React from "react";
import { useParams } from "react-router-dom";

export default function TopicPage({ topics }) {
  const { topicId } = useParams();
  const topic = topics.find((t) => t.id === topicId);

  if (!topic) {
    return <div>Topic not found.</div>;
  }

  return (
    <div className="topic-page">
      <h2>{topic.title}</h2>
      {topic.content.map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
    </div>
  );
}
