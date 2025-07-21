import { useState } from "react";
import Image from "next/image";

export default function CentsibleApp() {
  const [income, setIncome] = useState(0);
  const [housing, setHousing] = useState(0);
  const [food, setFood] = useState(0);
  const [transportation, setTransportation] = useState(0);
  const [entertainment, setEntertainment] = useState(0);
  const [otherExpenses, setOtherExpenses] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [advice, setAdvice] = useState("");

  const calculateAdvice = () => {
    const totalExpenses = housing + food + transportation + entertainment + otherExpenses;

    if (income <= 0 || isNaN(income) || isNaN(totalExpenses) || isNaN(savingsGoal)) {
      setAdvice("Please enter valid numbers for all fields.");
      return;
    }

    const savings = income - totalExpenses;
    const savingsRate = (savings / income) * 100;

    let suggestion = `Total monthly spending: $${totalExpenses.toFixed(2)}. You’re currently saving $${savings.toFixed(2)} (${savingsRate.toFixed(1)}%).`;

    if (savingsRate >= 20) {
      suggestion += "\n✅ You're saving more than the recommended 20%. Great job! Consider investing or building an emergency fund.";
    } else if (savingsRate >= 10) {
      suggestion += "\n🟡 You're saving some, but could cut back further. Consider reducing entertainment or food expenses.";
    } else if (savingsRate >= 0) {
      suggestion += "\n🔴 You're saving very little. Tighten your budget. Review recurring expenses and consider stricter categories.";
    } else {
      suggestion += "\n⚠️ You're spending more than you earn. Reduce housing or transportation costs, and reconsider nonessential expenses.";
    }

    setAdvice(suggestion);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3e8ff", padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
        <Image src="/centsible logo.png" alt="Centsible Logo" width={200} height={200} />
      </div>

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", color: "#6b21a8", marginBottom: "0.5rem" }}>
        Centsible
      </h1>
      <p style={{ textAlign: "center", color: "#7e22ce", marginBottom: "1.5rem" }}>
        Personalized AI Financial Guidance
      </p>

      <div style={{ maxWidth: "600px", margin: "0 auto", background: "white", padding: "1.5rem", borderRadius: "0.5rem" }}>
        <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={(e) => e.preventDefault()}>
          <label>Monthly Income ($): <input type="number" min="0" onChange={(e) => setIncome(parseFloat(e.target.value) || 0)} /></label>
          <label>Housing ($): <input type="number" min="0" onChange={(e) => setHousing(parseFloat(e.target.value) || 0)} /></label>
          <label>Food ($): <input type="number" min="0" onChange={(e) => setFood(parseFloat(e.target.value) || 0)} /></label>
          <label>Transportation ($): <input type="number" min="0" onChange={(e) => setTransportation(parseFloat(e.target.value) || 0)} /></label>
          <label>Entertainment ($): <input type="number" min="0" onChange={(e) => setEntertainment(parseFloat(e.target.value) || 0)} /></label>
          <label>Other Expenses ($): <input type="number" min="0" onChange={(e) => setOtherExpenses(parseFloat(e.target.value) || 0)} /></label>
          <label>Savings Goal ($): <input type="number" min="0" onChange={(e) => setSavingsGoal(parseFloat(e.target.value) || 0)} /></label>

          <button
            type="button"
            style={{ backgroundColor: "#9333ea", color: "white", padding: "0.75rem", borderRadius: "0.25rem", border: "none", cursor: "pointer" }}
            onClick={calculateAdvice}
          >
            Get AI Advice
          </button>

          {advice && (
            <div style={{ marginTop: "1rem", backgroundColor: "#f3e8ff", padding: "0.75rem", border: "1px solid #d8b4fe", borderRadius: "0.5rem", color: "#6b21a8", whiteSpace: "pre-line" }}>
              <strong>AI Suggestion:</strong> {advice}
            </div>
          )}

          {savingsGoal > 0 && income > 0 && (
            <div style={{ marginTop: "1rem" }}>
              <label>Savings Progress:</label>
              <progress
                value={Math.min(((income - (housing + food + transportation + entertainment + otherExpenses)) / savingsGoal) * 100, 100)}
                max="100"
                style={{ width: "100%" }}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
