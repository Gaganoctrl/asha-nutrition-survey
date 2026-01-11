// ============================================
// FOOD RECOMMENDATIONS MODULE
// ASHA Nutrition Survey - Food Recommendation Engine
// ============================================

const foodDatabase = {
  protein: [
    { food: "Eggs", quantity: "1-2 per day", value: "6g protein/egg", cost: "₹5-8", category: "animal", season: "year-round", icon: "🥚" },
    { food: "Milk/Curd", quantity: "200ml daily", value: "6g protein/cup", cost: "₹15-20", category: "dairy", season: "year-round", icon: "🥛" },
    { food: "Moong Dal", quantity: "1 cup cooked", value: "8g protein", cost: "₹30", category: "legume", season: "year-round", icon: "🫘" },
    { food: "Chick Peas (Chana)", quantity: "¾ cup cooked", value: "15g protein", cost: "₹40", category: "legume", season: "year-round", icon: "🫘" },
    { food: "Peanut Butter", quantity: "2 tbsp", value: "8g protein", cost: "₹20", category: "legume", season: "year-round", icon: "🥜" },
    { food: "Chicken", quantity: "100g cooked", value: "26g protein", cost: "₹60-80", category: "animal", season: "year-round", icon: "🍗" }
  ],
  calories: [
    { food: "Rice", quantity: "1 cup cooked", value: "206 calories", cost: "₹20/kg", category: "grain", notes: "Main carb", icon: "🍚" },
    { food: "Wheat Roti", quantity: "2-3 per meal", value: "70 cal/roti", cost: "₹1/roti", category: "grain", notes: "Complete protein", icon: "🫓" },
    { food: "Jaggery", quantity: "1 tbsp", value: "38 calories", cost: "₹5", category: "sweetener", notes: "Iron-rich", icon: "🍯" },
    { food: "Ghee/Oil", quantity: "1 tsp", value: "45 calories", cost: "₹8", category: "fat", notes: "Vitamin A", icon: "🧈" },
    { food: "Banana", quantity: "1 medium", value: "90 calories", cost: "₹5-10", category: "fruit", notes: "Potassium", icon: "🍌" },
    { food: "Sweet Potato", quantity: "1 medium", value: "100 calories", cost: "₹15", category: "vegetable", notes: "Beta-carotene", icon: "🍠" }
  ],
  micronutrients: [
    { food: "Spinach", quantity: "1 cup cooked", value: "Iron, Vit A, Folate", cost: "₹20", season: "winter", iron: "High", icon: "🥬" },
    { food: "Carrots", quantity: "1 medium", value: "Beta-carotene", cost: "₹5", season: "year-round", vitaminA: "High", icon: "🥕" },
    { food: "Orange/Citrus", quantity: "1 fruit", value: "Vitamin C, Folate", cost: "₹8", season: "winter", vitaminC: "High", icon: "🍊" },
    { food: "Tomato", quantity: "1 medium", value: "Lycopene, Vit C", cost: "₹5", season: "summer", antioxidants: "High", icon: "🍅" },
    { food: "Fortified Wheat Flour", quantity: "As per roti", value: "Iron, B12, Folate", cost: "₹30/kg", season: "year-round", fortified: true, icon: "🌾" },
    { food: "Sesame Seeds", quantity: "2 tbsp", value: "Calcium, Iron", cost: "₹30", season: "winter", calcium: "High", icon: "🤎" }
  ]
};

const recommendationMatrix = {
  "Severely Malnourished": {
    priority: "🔴 CRITICAL - Immediate Intervention Required",
    description: "This child needs urgent medical and nutritional support",
    recommendations: ["protein", "calories", "micronutrients"],
    mealFrequency: "4-5 meals/day + 2 snacks",
    urgency: "high",
    supplementation: "⚠️ CONSULT HEALTH WORKER IMMEDIATELY. Nutritional supplements are REQUIRED.",
    bgColor: "#fee2e2",
    borderColor: "#dc2626",
    followUpDays: 7
  },
  "At Risk": {
    priority: "🟠 HIGH PRIORITY - Close Monitoring Required",
    description: "This child shows signs of malnutrition and needs support",
    recommendations: ["protein", "calories"],
    mealFrequency: "3 meals + 2 snacks/day",
    urgency: "medium",
    supplementation: "✓ Fortified foods strongly recommended. Schedule regular health check-ups.",
    bgColor: "#fef08a",
    borderColor: "#f59e0b",
    followUpDays: 14
  },
  "Borderline": {
    priority: "🟡 MODERATE - Preventive Care Needed",
    description: "This child is borderline; focus on improving nutrition",
    recommendations: ["protein", "micronutrients"],
    mealFrequency: "3 balanced meals/day",
    urgency: "low",
    supplementation: "✓ Focus on diverse food groups. Consider fortified foods.",
    bgColor: "#fed7aa",
    borderColor: "#f97316",
    followUpDays: 30
  },
  "Nourished": {
    priority: "🟢 GOOD - Healthy Status Maintained",
    description: "This child is well-nourished. Continue current practices.",
    recommendations: ["micronutrients"],
    mealFrequency: "3 meals/day with variety",
    urgency: "low",
    supplementation: "✓ Continue balanced, diverse diet. Maintain current healthy habits.",
    bgColor: "#dcfce7",
    borderColor: "#22c55e",
    followUpDays: 60
  }
};

function generateRecommendations(childData, status) {
  const rec = recommendationMatrix[status];
  const foods = [];
  
  if (rec.recommendations.includes("protein")) foods.push(...foodDatabase.protein.slice(0, 3));
  if (rec.recommendations.includes("calories")) foods.push(...foodDatabase.calories.slice(0, 3));
  if (rec.recommendations.includes("micronutrients")) foods.push(...foodDatabase.micronutrients.slice(0, 3));
  
  return {
    status: status,
    priority: rec.priority,
    description: rec.description,
    urgency: rec.urgency,
    bgColor: rec.bgColor,
    borderColor: rec.borderColor,
    mealFrequency: rec.mealFrequency,
    foods: foods,
    supplementation: rec.supplementation,
    followUpDays: rec.followUpDays
  };
}

function generateMealPlan(status) {
  const plans = {
    "Severely Malnourished": { breakfast: "Fortified cereal with milk and egg", midMorning: "Banana with peanut butter", lunch: "Rice with moong dal, carrots, and ghee", afternoon: "Milk with jaggery", dinner: "Wheat roti with vegetable curry", notes: "Include fortified foods. Add extra ghee/oil." },
    "At Risk": { breakfast: "Wheat roti with curd and banana", midMorning: "Orange or local fruit", lunch: "Rice with chana, spinach, and oil", afternoon: "Milk or buttermilk", dinner: "Moong dal with roti", notes: "Include 2 protein sources daily." },
    "Borderline": { breakfast: "Rice porridge with jaggery and ghee", midMorning: "Fruit or nuts", lunch: "Roti with dal and seasonal vegetable", afternoon: "Milk or curd", dinner: "Rice or roti with curry", notes: "Ensure food variety." },
    "Nourished": { breakfast: "Varied - roti, rice, eggs, or porridge", midMorning: "Seasonal fruit", lunch: "Balanced meal with protein, carb, vegetable", afternoon: "Milk or yogurt", dinner: "Varied dinner maintaining balance", notes: "Continue healthy eating." }
  };
  return plans[status] || plans["Borderline"];
}

window.generateRecommendations = generateRecommendations;
window.generateMealPlan = generateMealPlan;
window.foodDatabase = foodDatabase;


// ============================================
// FAST FOOD RECOMMENDATIONS MODULE
// Quick lookup for rapid nutritional guidance
// ============================================

const fastFoodIndex = {
 // Category-based quick lookup
 protein: foodDatabase.protein.reduce((acc, food, idx) => ({ ...acc, [food.food.toLowerCase()]: { ...food, idx } }), {}),
 calories: foodDatabase.calories.reduce((acc, food, idx) => ({ ...acc, [food.food.toLowerCase()]: { ...food, idx } }), {}),
 micronutrients: foodDatabase.micronutrients.reduce((acc, food, idx) => ({ ...acc, [food.food.toLowerCase()]: { ...food, idx } }), {}),
};

// Cache for frequently accessed recommendations
const recommendationCache = {};

/**
 * FAST RECOMMENDATION FUNCTION
 * Returns instant food recommendations based on nutritional status
 * Time complexity: O(1) - Direct lookup
 */
function getFastRecommendations(status) {
 // Check cache first
 if (recommendationCache[status]) {
 return recommendationCache[status];
 }
 
 const rec = recommendationMatrix[status];
 if (!rec) return null;
 
 const result = {
 status: status,
 priority: rec.priority,
 urgency: rec.urgency,
 bgColor: rec.bgColor,
 borderColor: rec.borderColor,
 mealFrequency: rec.mealFrequency,
 supplementation: rec.supplementation,
 followUpDays: rec.followUpDays,
 foods: []
 };
 
 // Fast food lookup
 rec.recommendations.forEach(category => {
 if (foodDatabase[category]) {
 result.foods.push(...foodDatabase[category].slice(0, 2));
 }
 });
 
 // Cache the result
 recommendationCache[status] = result;
 return result;
}

/**
 * FOOD SEARCH FUNCTION
 * Quickly find a food by name across all categories
 * Returns: Food object with category info
 */
function searchFood(foodName) {
 const name = foodName.toLowerCase().trim();
 
 // Search across all categories
 for (const [category, foods] of Object.entries(fastFoodIndex)) {
 if (foods[name]) {
 return {
 food: foods[name],
 category: category,
 found: true
 };
 }
 }
 
 return { found: false, message: `Food '${foodName}' not found in database` };
}

/**
 * CATEGORY QUICK LOOKUP
 * Get all foods in a specific category
 */
function getFoodsByCategory(category) {
 return foodDatabase[category] || [];
}

/**
 * QUICK MEAL SUGGESTION
 * Suggests best foods for specific nutrient needs
 */
function quickMealSuggestion(nutrientNeeds) {
 // nutrientNeeds: ['protein', 'iron', 'calcium']
 const suggestions = [];
 const seen = new Set();
 
 nutrientNeeds.forEach(need => {
 foodDatabase.protein.forEach(food => {
 if (!seen.has(food.food)) {
 suggestions.push(food);
 seen.add(food.food);
 }
 });
 foodDatabase.micronutrients.forEach(food => {
 if (!seen.has(food.food)) {
 suggestions.push(food);
 seen.add(food.food);
 }
 });
 });
 
 return suggestions.slice(0, 5);
}

/**
 * INSTANT ANALYSIS
 * Analyze child data and return quick recommendations in <100ms
 */
function instantAnalysis(childData) {
 const score = calculateQuickScore(childData);
 const status = classifyChildStatus(score);
 return getFastRecommendations(status);
}

/**
 * QUICK SCORE CALCULATOR
 * Simplified scoring for instant feedback
 */
function calculateQuickScore(data) {
 let score = 0;
 
 if (data.muac < 11.5) score += 3;
 else if (data.muac < 12.5) score += 2;
 else if (data.muac < 13.5) score += 1;
 
 if (data.mealsPerDay <= 2) score += 2;
 else if (data.mealsPerDay === 3) score += 1;
 
 if (data.dietGroups <= 2) score += 2;
 else if (data.dietGroups <= 4) score += 1;
 
 if (data.illness === 'yes') score += 1;
 if (data.immunized === 'no') score += 1;
 
 return score;
}

/**
 * STATUS CLASSIFIER
 * Quick status mapping
 */
function classifyChildStatus(score) {
 if (score >= 6) return "Severely Malnourished";
 if (score >= 4) return "At Risk";
 if (score >= 2) return "Borderline";
 return "Nourished";
}

/**
 * BATCH RECOMMENDATION
 * Process multiple children data for quick analysis
 */
function batchRecommendations(childrenData) {
 return childrenData.map(child => ({
 childId: child.id,
 recommendation: instantAnalysis(child),
 timestamp: new Date().toISOString()
 }));
}

/**
 * CLEAR CACHE
 * Force refresh of cached recommendations
 */
function clearRecommendationCache() {
 Object.keys(recommendationCache).forEach(key => delete recommendationCache[key]);
}

// Export fast recommendation functions
window.getFastRecommendations = getFastRecommendations;
window.searchFood = searchFood;
window.getFoodsByCategory = getFoodsByCategory;
window.quickMealSuggestion = quickMealSuggestion;
window.instantAnalysis = instantAnalysis;
window.batchRecommendations = batchRecommendations;
window.clearRecommendationCache = clearRecommendationCache;
window.fastFoodIndex = fastFoodIndex;
