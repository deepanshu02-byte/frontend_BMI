import React, { useState } from "react";
import axios from "axios";

const CalculateBmi: React.FC = () => {
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  const calculateBmi = async () => {
    if (weight && height) {
      try {
        const response = await axios.post("http://localhost:5000/api/bmi/", {
          userid: "user_12345", // Replace with dynamic user ID if available
          height,
          weight,
        });

        const { bmi, category } = response.data.data;
        setBmi(bmi);
        setCategory(category);
      } catch (error) {
        console.error("Error calculating BMI:", error);
      }
    }
  };

  const getProgressColor = () => {
    if (!bmi) return "bg-gray-300";
    if (bmi < 18.5) return "bg-blue-400";
    if (bmi < 24.9) return "bg-green-500";
    if (bmi < 29.9) return "bg-yellow-400";
    return "bg-red-500";
  };

  const getProgressWidth = () => {
    const maxBmi = 40;
    const percentage = bmi ? Math.min((bmi / maxBmi) * 100, 100) : 0;
    return `${percentage}%`;
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">BMI Calculator</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Height (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

            <button
                onClick={calculateBmi}
                disabled={!weight || !height}
                className={`w-full py-2 rounded-md transition duration-200 ${
                    !weight || !height
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                >
                Calculate BMI
            </button>


      {bmi !== null && (
        <div className="mt-6">
          <div className="text-center text-lg font-semibold text-gray-800 mb-2">
            Your BMI is: {bmi} ({category})
          </div>

          <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
            <div
              className={`h-full ${getProgressColor()} transition-all duration-500`}
              style={{ width: getProgressWidth() }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>Underweight</span>
            <span>Normal</span>
            <span>Overweight</span>
            <span>Obese</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculateBmi;
