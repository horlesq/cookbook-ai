import { NextResponse } from "next/server";
import OpenAI from "openai";

const deepseek = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.deepseek.com/v1",
});

function safeParseJson(jsonString) {
    try {
        const cleanedString = jsonString.replace(/```json\s*|```/g, "").trim();
        return JSON.parse(cleanedString);
    } catch (e) {
        console.error("Failed to parse JSON from AI response:", e);
        return { recipes: [] };
    }
}

async function fetchPexelsImage(searchQuery) {
    try {
        const response = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(
                searchQuery
            )}&per_page=1&orientation=landscape`,
            {
                headers: {
                    Authorization: process.env.PEXELS_API_KEY,
                },
            }
        );

        if (!response.ok) {
            console.error("Pexels API error:", response.status);
            return null;
        }

        const data = await response.json();

        return data.photos[0]?.src?.medium || null;
    } catch (error) {
        console.error("Error fetching Pexels image:", error);
        return null;
    }
}

export async function POST(request) {
    const { query } = await request.json();

    if (!query) {
        return NextResponse.json(
            { error: "Missing query parameter" },
            { status: 400 }
        );
    }

    // Prompt
    const systemInstruction = `
        You are a culinary AI assistant. Your task is to generate 5 recipe suggestions 
        based ONLY on the user's input (ingredients/description). 
        
        The output MUST be a JSON object containing a 'recipes' array, strictly following this structure:
        {
          "recipes": [
            {
              "id": number, // Unique ID (e.g., 100, 101, 102). Use a random 3-digit number.
              "name": string, // Creative name for the dish
              "time": string, // Estimated preparation and cooking time (e.g., "30 min")
              "ingredients": [string array], // Full list of ingredients with measurements
              "instructions": [string array] // Step-by-step very very detailed cooking instructions
              "imageSearchQuery": string // A concise search phrase for finding food images (e.g., "chicken pasta", "chocolate cake", "grilled salmon")
            }
          ]
        }
        
        Do not include any text, explanations, or markdown outside the final JSON block.
    `;

    try {
        const completion = await deepseek.chat.completions.create({
            model: "deepseek-chat",
            messages: [
                { role: "system", content: systemInstruction },
                {
                    role: "user",
                    content: `Generate recipes based on this: ${query}`,
                },
            ],

            temperature: 0.7,
        });

        const aiResponseText = completion.choices[0].message.content;
        const jsonResponse = safeParseJson(aiResponseText);

        const recipesWithImages = await Promise.all(
            (jsonResponse.recipes || []).map(async (recipe) => {
                if (recipe.imageSearchQuery) {
                    const imageUrl = await fetchPexelsImage(
                        recipe.imageSearchQuery
                    );
                    return { ...recipe, image: imageUrl };
                }
                return recipe;
            })
        );

        return NextResponse.json({
            query: query,
            recipes: recipesWithImages,
        });
    } catch (error) {
        console.error("DeepSeek Generation Error:", error);
        return NextResponse.json(
            { error: "Failed to generate recipes from AI." },
            { status: 500 }
        );
    }
}

export const dynamic = "force-dynamic";
