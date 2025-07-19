import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import 'react-toastify/dist/ReactToastify.css';

const MealPlanner: React.FC = () => {
  const [planType, setPlanType] = useState("daily");
  const [goal, setGoal] = useState("weight-loss");
  const [dietPreferences, setDietPreferences] = useState<string[]>([]);
  const navigate=useNavigate();
  const [suggestions, setSuggestions] = useState<{
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  }>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });

  const [selectedMeals, setSelectedMeals] = useState<{
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  }>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });

  const dietOptions = ["Vegetarian", "NonVeg", "Keto", "Paleo", "Low-Carb"];

  const handleDietPreferenceChange = (option: string) => {
    setDietPreferences((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleMealSelection = (mealType: keyof typeof selectedMeals, meal: string) => {
    setSelectedMeals((prev) => {
      const current = prev[mealType];
      return {
        ...prev,
        [mealType]: current.includes(meal)
          ? current.filter((m) => m !== meal)
          : [...current, meal],
      };
    });
  };

  const generatePlan = () => {
    const base = {
      "weight-loss": {
        breakfast: ["Oats with berries", "Greek yogurt with honey", "Smoothie with spinach"],
        lunch: ["Grilled chicken salad", "Quinoa bowl", "Zucchini noodles"],
        dinner: ["Steamed veggies with tofu", "Baked salmon and greens", "Cauliflower rice stir-fry"],
        snacks: ["Carrot sticks", "Boiled eggs", "Apple slices with peanut butter"],
      },
      "muscle-gain": {
        breakfast: ["Eggs and toast", "Protein pancakes", "Cottage cheese with fruit"],
        lunch: ["Chicken breast with quinoa", "Beef burrito bowl", "Tuna sandwich"],
        dinner: ["Salmon with sweet potatoes", "Steak with brown rice", "Lentil curry"],
        snacks: ["Protein shake", "Trail mix", "Banana with almond butter"],
      },
      maintenance: {
        breakfast: ["Smoothie bowl", "Granola with milk", "Avocado toast"],
        lunch: ["Turkey sandwich", "Veggie wrap", "Rice and beans"],
        dinner: ["Stir-fried vegetables with rice", "Grilled fish and salad", "Pasta primavera"],
        snacks: ["Nuts and fruits", "Yogurt", "Popcorn"],
      },
    };

    setSuggestions(base[goal as keyof typeof base]);
    setSelectedMeals({ breakfast: [], lunch: [], dinner: [], snacks: [] });
  };

  const handleSubmit = async () => {
  const payload = {
    planType,
    fitnessGoal: goal,
    dietPreference: dietPreferences,
    meals: {
      breakfast: selectedMeals.breakfast,
      lunch: selectedMeals.lunch,
      dinner: selectedMeals.dinner,
    },
  };

  try {
    const response = await fetch("http://localhost:5000/api/meal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("selectedMealPlan", JSON.stringify(payload.meals));
      toast.success("Meal plan submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/dashboard");
    } else {
      toast.error("Failed to submit meal plan.");
    }
  } catch (error) {
    console.error("Error submitting meal plan:", error);
    toast.error("An error occurred while submitting the meal plan.");
  }
};


  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        🥗 Meal Plan Generator
      </h2>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-800 mb-2">Plan Type</label>
        <select
          value={planType}
          onChange={(e) => setPlanType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-800 mb-2">Fitness Goal</label>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="weight-loss">Weight Loss</option>
          <option value="muscle-gain">Muscle Gain</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-800 mb-2">Diet Preferences</label>
        <div className="flex flex-wrap gap-4">
          {dietOptions.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={dietPreferences.includes(option)}
                onChange={() => handleDietPreferenceChange(option)}
                className="accent-blue-600"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={generatePlan}
        className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
      >
        Generate Meal Plan
      </button>

      {Object.keys(suggestions).some((key) => suggestions[key as keyof typeof suggestions].length > 0) && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🍽 Select Your Meals</h3>
          {(["breakfast", "lunch", "dinner", "snacks"] as const).map((mealType) => (
            <div key={mealType} className="mb-4">
              <h4 className="text-lg font-medium text-gray-700 capitalize mb-2">{mealType}</h4>
              <div className="flex flex-wrap gap-4">
                {suggestions[mealType].map((meal) => (
                  <label key={meal} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedMeals[mealType].includes(meal)}
                      onChange={() => handleMealSelection(mealType, meal)}
                      className="accent-green-600"
                    />
                    <span className="text-gray-700">{meal}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition duration-200"
          >
            Submit Meal Plan
          </button>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
