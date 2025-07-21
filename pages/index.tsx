import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CentsibleApp() {
  const [income, setIncome] = useState(0);
  const [housing, setHousing] = useState(0);
  const [food, setFood] = useState(0);
  const [transportation, setTransportation] = useState(0);
  const [entertainment, setEntertainment] = useState(0);
  const [otherExpenses, setOtherExpenses] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [advice, setAdvice] = useState("");

  const router = useRouter();

  // Load user data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("centsibleData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setIncome(parsed.income || 0);
      setHousing(parsed.housing || 0);
      setFood(parsed.food || 0);
      setTransportation(parsed.transportation || 0);
      setEntertainment(parsed.entertainment || 0);
      setOtherExpenses(parsed.otherExpenses || 0);
      setSavingsGoal(parsed.savingsGoal || 0);
    }
  }, []);

  // Save user data to localStorage
  useEffect(() => {
    localStorage.setItem(
      "centsibleData",
      JSON.stringify({
        income,
        housing,
        food,
        transportation,
        entertainment,
        otherExpenses,
        savingsGoal,
      })
    );
  }, [income, housing, food, transportation, entertainment, otherExpenses, savingsGoal]);

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
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Image src="/centsible-logo.png" alt="Centsible Logo" width={50} height={50} />
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#6b21a8" }}>Centsible</h1>
        </div>
        <nav style={{ display: "flex", gap: "1rem" }}>
          <Link href="/">Home</Link>
          <Link href="/flashcards">Flashcards</Link>
          <Link href="/quiz">Quiz</Link>
        </nav>
      </header>

      <main>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", textAlign: "center", color: "#7e22ce", marginBottom: "1.5rem" }}>
          Personalized AI Financial Guidance
        </h2>

        <div style={{ maxWidth: "600px", margin: "0 auto", background: "white", padding: "1rem", borderRadius: "0.5rem", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <label>Monthly Income ($): <input type="number" value={income} onChange={(e) => setIncome(parseFloat(e.target.value) || 0)} /></label>
            <label>Housing ($): <input type="number" value={housing} onChange={(e) => setHousing(parseFloat(e.target.value) || 0)} /></label>
            <label>Food ($): <input type="number" value={food} onChange={(e) => setFood(parseFloat(e.target.value) || 0)} /></label>
            <label>Transportation ($): <input type="number" value={transportation} onChange={(e) => setTransportation(parseFloat(e.target.value) || 0)} /></label>
            <label>Entertainment ($): <input type="number" value={entertainment} onChange={(e) => setEntertainment(parseFloat(e.target.value) || 0)} /></label>
            <label>Other Expenses ($): <input type="number" value={otherExpenses} onChange={(e) => setOtherExpenses(parseFloat(e.target.value) || 0)} /></label>
            <label>Savings Goal ($): <input type="number" value={savingsGoal} onChange={(e) => setSavingsGoal(parseFloat(e.target.value) || 0)} /></label>

            <button style={{ backgroundColor: "#9333ea", color: "white", padding: "0.5rem", borderRadius: "0.25rem", border: "none", cursor: "pointer" }} onClick={calculateAdvice}>
              Get AI Advice
            </button>

            {advice && (
              <div style={{ marginTop: "1rem", backgroundColor: "#f3e8ff", padding: "0.75rem", border: "1px solid #d8b4fe", borderRadius: "0.5rem", color: "#6b21a8", whiteSpace: "pre-line" }}>
                <strong>AI Suggestion:</strong> {advice}
              </div>
            )}

            {savingsGoal > 0 && income > 0 && !isNaN(income) && !isNaN(savingsGoal) && (
              <div style={{ marginTop: "1rem" }}>
                <label>Savings Progress:</label>
                <progress value={Math.min(((income - (housing + food + transportation + entertainment + otherExpenses)) / savingsGoal) * 100, 100)} max="100" style={{ width: "100%" }} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
