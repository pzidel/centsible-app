import { useState } from "react";

const flashcards = [
  { question: "What is a budget?", answer: "A plan for how to spend and save money." },
  { question: "What is compound interest?", answer: "Interest on both principal and accumulated interest." },
  { question: "What is an emergency fund?", answer: "Money saved to cover unexpected expenses or emergencies." },
  { question: "What is credit utilization?", answer: "How much of your available credit you're using — keep it under 30%." },
  { question: "What does APR stand for?", answer: "Annual Percentage Rate — interest charged on borrowed money." },
];

export default function FlashcardsPage() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const nextCard = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", color: "#6b21a8", marginBottom: "1.5rem" }}>Flashcards</h1>
      <div style={{ backgroundColor: "#fff", padding: "2rem", borderRadius: "1rem", boxShadow: "0 0 10px rgba(0,0,0,0.1)", maxWidth: "500px", margin: "0 auto" }}>
        <p style={{ fontSize: "1.25rem" }}>
          <strong>Q:</strong> {flashcards[index].question}
        </p>
        {showAnswer && (
          <p style={{ fontSize: "1.25rem", marginTop: "1rem", color: "#9333ea" }}>
            <strong>A:</strong> {flashcards[index].answer}
          </p>
        )}
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
          <button onClick={() => setShowAnswer(!showAnswer)} style={{ padding: "0.5rem 1rem", background: "#6b21a8", color: "#fff", borderRadius: "0.5rem", border: "none" }}>
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
          <button onClick={nextCard} style={{ padding: "0.5rem 1rem", background: "#9333ea", color: "#fff", borderRadius: "0.5rem", border: "none" }}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
