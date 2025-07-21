// STEP 1: Create `pages/flashcards.tsx`
import { useState } from "react";
import Link from "next/link";

const flashcards = [
  {
    question: "What is a budget?",
    answer: "A plan for managing income and expenses over a set period."
  },
  {
    question: "What does APR stand for?",
    answer: "Annual Percentage Rate"
  },
  // Add 98 more flashcards per category (budgeting, saving, investing, credit, etc)
];

export default function FlashcardsPage() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNext = () => {
    setShowAnswer(false);
    setIndex((index + 1) % flashcards.length);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Flashcards</h1>
      <div style={{ background: "#fff", padding: "1rem", borderRadius: "0.5rem", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <p><strong>Q:</strong> {flashcards[index].question}</p>
        {showAnswer && <p><strong>A:</strong> {flashcards[index].answer}</p>}
        <button onClick={() => setShowAnswer(!showAnswer)} style={{ marginTop: "1rem" }}>
          {showAnswer ? "Hide" : "Show"} Answer
        </button>
        <button onClick={handleNext} style={{ marginLeft: "1rem" }}>
          Next
        </button>
      </div>
      <p style={{ marginTop: "1rem" }}><Link href="/">← Back to Home</Link></p>
    </div>
  );
}
