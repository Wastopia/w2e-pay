

import { Button } from "../../components/ui/button";
import HeaderSection from "../../components/HeaderSection";
import { Link } from "@tanstack/router";
import MainSection from "../../components/MainSection";
import Page from "../../components/Page";
import { X } from "lucide-react";
import { KeyPad } from "./components/KeyPad";
import { Key } from "./types/key.type";
import { useState } from "react";
import ChargeButton from "./components/ChargeButton";

export default function ChargePage() {
  const [weight, setWeight] = useState<string>("0");
  const [costPerKg, setCostPerKg] = useState(0); // New state for cost
  const [totalCost, setTotalCost] = useState(0);

  const handleKey = (key: Key) => {
    switch (key) {
      case "decimal":
        if (!weight.includes(".")) {
          setWeight(weight + ".");
        }
        break;
      case "backspace":
        setWeight(weight.slice(0, -1) || "0");
        break;
      case "0":
        if (weight !== "0") {
          setWeight(weight + "0");
        }
        break;
      default:
        if (weight === "0") {
          setWeight(key);
        } else {
          setWeight(weight + key);
        }
        break;
    }
    const prevWeight = weight;  // Store previous weight for comparison
    if (weight !== prevWeight) {  // Check if weight changed
      const enteredWeight = parseFloat(weight);
      setTotalCost(enteredWeight * costPerKg);
    }
  };

  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCostPerKg(parseFloat(event.target.value));
  };

  const handleCharge = () => {
    const enteredWeight = parseFloat(weight);
    const totalCost = enteredWeight * costPerKg;
    setTotalCost(totalCost);
  };

  return (
    <Page>
      <div className="relative flex flex-col grow">
        <HeaderSection>
          <Link to="/merchant">
            <Button variant="ghost" size="icon">
              <X className="w-4 h-4" />
            </Button>
          </Link>
          Calculator
          <div className="w-8"></div>

        </HeaderSection>

        <MainSection>
          <div className="flex flex-col items-center justify-between flex-1 pt-10 pb-10 space-y-5 grow">
            <div className="flex items-center mb-5">
              <label htmlFor="costPerKg" className="mr-2">Cost per Kg ($W2E):</label>
              <input
                id="costPerKg"
                type="number"
                value={costPerKg}
                onChange={handleCostChange}
              />
            </div>
            <div className="text-4xl font-bold">{weight} kgs</div>
            <div className="flex-grow" />
            <KeyPad onKey={handleKey} />
            {totalCost > 0 && ( // Only display total cost if calculated
              <div className="text-xl font-bold">Total Cost: {totalCost.toFixed(2)} </div>
            )}

            <ChargeButton
              onClick={handleCharge}
              amount={totalCost}
              disabled={weight === "0" || costPerKg === 0} // Disable if no weight or cost entered 
            />
          </div>
        </MainSection>
      </div>
    </Page>
  );
}

