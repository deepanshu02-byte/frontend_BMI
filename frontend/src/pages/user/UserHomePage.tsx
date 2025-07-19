import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../../components/reusable/Card";
import { getLoggedInUser } from "../../utils/utils";

const nutritionInfo: Record<string, { calories: number; protein: number; carbs: number }> = {
  "Scrambled eggs": { calories: 200, protein: 12, carbs: 2 },
  "Avocado toast": { calories: 250, protein: 6, carbs: 20 },
  "Protein shake": { calories: 180, protein: 20, carbs: 5 },
  "Grilled chicken salad": { calories: 300, protein: 25, carbs: 10 },
  "Quinoa bowl": { calories: 350, protein: 15, carbs: 40 },
  "Steamed broccoli": { calories: 50, protein: 4, carbs: 10 },
  "Salmon fillet": { calories: 400, protein: 30, carbs: 0 },
  "Sweet potato mash": { calories: 200, protein: 4, carbs: 35 },
  "Mixed greens": { calories: 80, protein: 2, carbs: 5 },
};

const UserHomePage: React.FC = () => {
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [bmiData, setBmiData] = useState<{ bmi: number; category: string } | null>(null);
  const [nutritionInfo, setNutritionInfo] = useState<Record<string, { calories: number; protein: number; carbs: number }>>({});

  const userData = getLoggedInUser();

  useEffect(() => {
    const fetchMealPlan = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/meal");
    if (response.data?.data?.length > 0) {
      const selectedPlan = response.data.data[0];
      const meals = selectedPlan.meals;
      setMealPlan(meals);
      localStorage.setItem("selectedMealPlan", JSON.stringify(meals));

      // Build nutrition info dynamically
      const allMeals = [...meals.breakfast, ...meals.lunch, ...meals.dinner];
      const nutritionMap: Record<string, { calories: number; protein: number; carbs: number }> = {};

      // allMeals.forEach((meal) => {
      // console.log('inside')
      //   if (baseNutrition[meal]) {
      //     nutritionMap[meal] = baseNutrition[meal];
      //   }
      // });

      setNutritionInfo(nutritionMap);
    }
  } catch (error) {
    console.error("Failed to fetch meal plan:", error);
  }
};


    const fetchBMI = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bmi", {
          params: { userid: userData.userid },
        });

        if (response.data?.data?.length > 0) {
          const latest = response.data.data[0];
          setBmiData({ bmi: latest.bmi, category: latest.category });
        }
      } catch (error) {
        console.error("Failed to fetch BMI:", error);
      }
    };

    fetchMealPlan();
    fetchBMI();
  }, [userData.userid]);

  const calculateProgress = () => {
    let totalCalories = 0;
    if (mealPlan) {
      Object.values(mealPlan).forEach((meals: string[]) => {
        meals.forEach((meal) => {
          if (nutritionInfo[meal]) {
            totalCalories += nutritionInfo[meal].calories;
          }
        });
      });
    }
    return {
      calories: totalCalories,
      weightChange: totalCalories > 2000 ? "+0.5kg (est.)" : "-0.3kg (est.)",
    };
  };

  const progress = calculateProgress();

  return (
    <div className="p-6 min-h-screen bg-gray-50 relative">
      {bmiData && (
        <div className="absolute top-6 right-6 bg-blue-100 text-blue-800 px-4 py-2 rounded-md shadow-md text-sm font-medium">
          BMI: {bmiData.bmi} ({bmiData.category})
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8 text-blue-700">Welcome Back, {userData.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="📝 Registration Profile" variant="elevated">
          <ul className="text-sm text-gray-700 space-y-2">
            <li><strong>Name:</strong> {userData.name}</li>
            <li><strong>Height:</strong> 5.10</li>
            <li><strong>Weight:</strong> 70kg</li>
            <li><strong>Registered On:</strong> 2025-07-19</li>
          </ul>
        </Card>

        <Card title="📊 Progress After Meal Plan" variant="elevated">
          <ul className="text-sm text-gray-700 space-y-2">
            <li><strong>Total Calories Consumed:</strong> {progress.calories} kcal</li>
            <li><strong>Estimated Weight Change:</strong> {progress.weightChange}</li>
            <li><strong>Meal Plan Status:</strong> {mealPlan ? "Active" : "Not Started"}</li>
          </ul>
        </Card>
      </div>

      {mealPlan && (
        <Card title="🍽 Your Selected Meal Plan" variant="outlined" className="mb-8">
          {["breakfast", "lunch", "dinner"].map((mealType) => (
            <div key={mealType} className="mb-4">
              <h3 className="text-lg font-semibold capitalize mb-2 text-gray-800">{mealType}</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {mealPlan[mealType].map((meal: string) => (
                  <li key={meal} className="flex justify-between items-center">
                    <span>{meal}</span>
                    {nutritionInfo[meal] ? (
                      <span className="text-xs text-gray-500">
                        {nutritionInfo[meal].calories} kcal, {nutritionInfo[meal].protein}g protein, {nutritionInfo[meal].carbs}g carbs
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Nutrition info unavailable</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

export default UserHomePage;
