import { useState } from "react";

const flashcardData = {
  Budgeting: Array.from({ length: 100 }, (_, i) => ({
    question: `What is Budgeting Question ${i + 1}?`,
    answer: `This is the answer for Budgeting Question ${i + 1}.`
  })),
  Saving: Array.from({ length: 100 }, (_, i) => ({
    question: `What is Saving Question ${i + 1}?`,
    answer: `This is the answer for Saving Question ${i + 1}.`
  })),
  Investing: Array.from({ length: 100 }, (_, i) => ({
    question: `What is Investing Question ${i + 1}?`,
    answer: `This is the answer for Investing Question ${i + 1}.`
  })),
  Credit: Array.from({ length: 100 }, (_, i) => ({
    question: `What is Credit Question ${i + 1}?`,
    answer: `This is the answer for Credit Question ${i + 1}.`
  })),
  Banking: Array.from({ length: 100 }, (_, i) => ({
    question: `What is Banking Question ${i + 1}?`,
    answer: `This is the answer for Banking Question ${i + 1}.`
  })),
  Taxes: Array.from({ length: 100 }, (_, i) => ({
    question: `What is Taxes Question ${i + 1}?`,
    answer: `This is the answer for Taxes Question ${i + 1}.`
  })),
  Loans: Array.from({ length: 100 }, (_, i) => ({
    question: `What is Loans Question ${i + 1}?`,
    answer: `This is the answer for Loans Question ${i + 1}.`
  })),
  Insurance: Array.from({ length: 100 }, (_, i) => ({
    question: `What is Insurance Question ${i + 1}?`,
    answer: `This is the answer for Insurance Question ${i + 1}.`
  })),
  Retirement: Array.from({ length: 100 }, (_, i) => ({
    question: `What is Retirement Question ${i + 1}?`,
    answer: `This is the answer for Retirement Question ${i + 1}.`
  })),
  FinancialPlanning: Array.from({ length: 100 }, (_, i) => ({
    question: `What is Financial Planning Question ${i + 1}?`,
    answer: `This is the answer for Financial Planning Question ${i + 1}.`
  }))
};

type CategoryKey = keyof typeof flashcardData;
const categories = Object.keys(flashcardData) as CategoryKey[];

export default function Flashcards() {
  const [category, setCategory] = useState<CategoryKey>("Budgeting");
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const flashcards = flashcardData[category];
  const card = flashcards[index];

  const handleNext = () => {
    setShowAnswer(false);
    setIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Flashcards - {category}</h1>
      <div>
        <label htmlFor="category">Select Category: </label>
        <select
          id="category"
          value={category}
          onChange={(e) => {
            const selected = e.target.value as CategoryKey;
            setCategory(selected);
            setIndex(0);
            setShowAnswer(false);
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={{
        marginTop: "2rem",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "600px"
      }}>
        <p><strong>Q:</strong> {card.question}</p>
        {showAnswer && <p><strong>A:</strong> {card.answer}</p>}
        <button onClick={() => setShowAnswer((prev) => !prev)}>
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
        <button onClick={handleNext} style={{ marginLeft: "1rem" }}>
          Next
        </button>
      </div>
    </div>
  );
}
