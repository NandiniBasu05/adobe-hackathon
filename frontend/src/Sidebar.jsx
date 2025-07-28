import { useEffect, useState } from "react";

export default function Sidebar() {
  const [outline, setOutline] = useState([]);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    fetch("/outline.json")
      .then((res) => res.json())
      .then((data) => setOutline(data.outline || []));

    fetch("/result.json")
      .then((res) => res.json())
      .then((data) => setRanking(data.extracted_sections || []));
  }, []);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ width: "320px", padding: "1rem", borderRight: "1px solid #ccc", height: "100vh", overflowY: "scroll" }}>
      <h2>📑 Outline</h2>
      {outline.map((item, idx) => (
        <p key={idx}><strong>{item.level}</strong>: {item.text} (Page {item.page})</p>
      ))}

      <h2 style={{ marginTop: "2rem" }}>⭐ Highlights</h2>
      {ranking.map((item, idx) => (
        <div key={idx} style={{ marginBottom: "1rem" }}>
          <strong>{item.section_title}</strong>
          <p>Page {item.page_number}</p>
          <p>{item.refined_text.slice(0, 150)}...</p>
          <button onClick={() => speak(item.refined_text)}>🔊 Listen</button>
        </div>
      ))}
    </div>
  );
}