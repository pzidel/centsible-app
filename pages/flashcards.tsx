import { useState } from "react";

const categories = {
  Budgeting: [
    {
      question: "What is a budget?",
      answer: "A budget is a plan that helps you track your income and expenses over time."
    },
    {
      question: "What is the 50/30/20 rule?",
      answer: "50% Needs, 30% Wants, 20% Savings/Debt Repayment."
    },
    // Add more cards here...
  ],
  Saving: [
    {
      question: "Why is it important to have an emergency fund?",
      answer: "To cover unexpected expenses like medical bills or job loss without using credit."
    },
    {
      question: "What’s a good rule for emergency savings?",
      answer: "Save 3–6 months’ worth of living expenses."
    },
    // Add more...
  ]
};

export default function FlashcardsPage() {
  const [category, setCategory] = useState("Budgeting");
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const flashcards = categories[category];
  const card = flashcards[index];

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", backgroundColor: "#fefce8", minHeight: "100vh" }}>
      <h1 style={{ color: "#7e22ce" }}>Flashcards: {category}</h1>

      <select value={category} onChange={(e) => { setCategory(e.target.value); setIndex(0); setShowAnswer(false); }} style={{ padding: "0.5rem", marginBottom: "1rem" }}>
        {Object.keys(categories).map((cat) => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      <div style={{ border: "2px solid #a855f7", padding: "1.5rem", borderRadius: "1rem", maxWidth: "600px", margin: "auto", background: "white", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <h2>{showAnswer ? card.answer : card.question}</h2>
        <button onClick={() => setShowAnswer(!showAnswer)} style={{ marginTop: "1rem", backgroundColor: "#9333ea", color: "white", padding: "0.5rem 1rem", border: "none", borderRadius: "0.5rem" }}>
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <button onClick={() => { if (index > 0) setIndex(index - 1); setShowAnswer(false); }} disabled={index === 0}>Previous</button>
        <button onClick={() => { if (index < flashcards.length - 1) setIndex(index + 1); setShowAnswer(false); }} disabled={index === flashcards.length - 1}>Next</button>
      </div>
    </div>
  );
}
