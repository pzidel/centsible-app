import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
    <div className="min-h-screen bg-purple-100 p-4">
      <div className="flex justify-center mb-6">
        <Image
          src="/centsible logo.png"
          alt="Centsible Logo"
          width={200}
          height={200}
        />
      </div>
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-2">
        Centsible
      </h1>
      <p className="text-center text-purple-700 mb-6">
        Personalized AI Financial Guidance
      </p>

      <Card className="max-w-xl mx-auto p-4">
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Monthly Income ($)</label>
              <Input type="number" onChange={(e) => setIncome(parseFloat(e.target.value) || 0)} />
            </div>
            <div>
              <label className="block text-sm font-medium">Housing ($)</label>
              <Input type="number" onChange={(e) => setHousing(parseFloat(e.target.value) || 0)} />
            </div>
            <div>
              <label className="block text-sm font-medium">Food ($)</label>
              <Input type="number" onChange={(e) => setFood(parseFloat(e.target.value) || 0)} />
            </div>
            <div>
              <label className="block text-sm font-medium">Transportation ($)</label>
              <Input type="number" onChange={(e) => setTransportation(parseFloat(e.target.value) || 0)} />
            </div>
            <div>
              <label className="block text-sm font-medium">Entertainment ($)</label>
              <Input type="number" onChange={(e) => setEntertainment(parseFloat(e.target.value) || 0)} />
            </div>
            <div>
              <label className="block text-sm font-medium">Other Expenses ($)</label>
              <Input type="number" onChange={(e) => setOtherExpenses(parseFloat(e.target.value) || 0)} />
            </div>
            <div>
              <label className="block text-sm font-medium">Savings Goal ($)</label>
              <Input type="number" onChange={(e) => setSavingsGoal(parseFloat(e.target.value) || 0)} />
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={calculateAdvice}>
              Get AI Advice
            </Button>
            {advice && (
              <div className="mt-4 bg-purple-100 p-3 border rounded text-purple-800 whitespace-pre-line">
                <strong>AI Suggestion:</strong> {advice}
              </div>
            )}
            {savingsGoal > 0 && income > 0 && !isNaN(income) && !isNaN(savingsGoal) && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Savings Progress</label>
                <Progress value={Math.min(((income - (housing + food + transportation + entertainment + otherExpenses)) / savingsGoal) * 100, 100)} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
