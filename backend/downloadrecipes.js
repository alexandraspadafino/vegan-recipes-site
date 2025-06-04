import fs from "fs";
import fetch from "node-fetch"; // If you're using Node <18

const API_URL = "https://0smx4eyl6b.execute-api.eu-north-1.amazonaws.com/dev/getRecipes"; // 🔁 Replace with your real endpoint

async function downloadRecipes() {
  try {
    console.log("📡 Fetching recipes from AWS...");
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

    const rawData = await response.json();

    // Try to parse the stringified objects
    const parsedData = rawData.map(item => {
      try {
        // Handle double-encoded objects
        return JSON.parse(item.id);
      } catch (e) {
        // If not double-encoded, return as-is
        return item;
      }
    });

    fs.writeFileSync("recipes.json", JSON.stringify(parsedData, null, 2));
    console.log("✅ Recipes successfully saved to 'recipes.json'");
  } catch (err) {
    console.error("❌ Error fetching recipes:", err.message);
  }
}

downloadRecipes();