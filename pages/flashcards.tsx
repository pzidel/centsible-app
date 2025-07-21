import { useState } from "react";

const sampleFlashcards = [
  { question: "What is a budget?", answer: "A plan for managing income and expenses." },
  { question: "What is compound interest?", answer: "Interest calculated on the initial principal and also on the accumulated interest." },
  { question: "What is a credit score?", answer: "A number representing a person's creditworthiness." },
  { question: "What is an emergency fund?", answer: "Money saved for unexpected expenses." },
  { question: "What is an IRA?", answer: "An Individual Retirement Account used to save for retirement with tax advantages." }
];

export default function FlashcardsPage() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const nextCard = () => {
    setIndex((index + 1) % sampleFlashcards.length);
    setShowAnswer(false);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem", color: "#6b21a8" }}>Flashcards</h1>
      <div style={{ backgroundColor: "#f3e8ff", padding: "1.5rem", borderRadius: "0.5rem", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <h2>{sampleFlashcards[index].question}</h2>
        {showAnswer && <p style={{ marginTop: "1rem", color: "#4b5563" }}>{sampleFlashcards[index].answer}</p>}
        <button onClick={() => setShowAnswer(!showAnswer)} style={{ marginTop: "1rem", marginRight: "1rem" }}>
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
        <button onClick={nextCard}>Next</button>
      </div>
    </div>
  );
}
