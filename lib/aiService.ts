
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";
import { MOCK_PRODUCTS } from "../constants";

export const getAIRecommendations = async (
  viewHistory: string[],
  cartItems: string[],
  currentProductId?: string
): Promise<string[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const catalogSubset = MOCK_PRODUCTS.map(p => ({
      id: p.id,
      name: p.name,
      category: p.categoryId,
      price: p.price
    }));

    const historyNames = viewHistory.map(id => MOCK_PRODUCTS.find(p => p.id === id)?.name).filter(Boolean);
    const cartNames = cartItems.map(id => MOCK_PRODUCTS.find(p => p.id === id)?.name).filter(Boolean);
    const currentName = currentProductId ? MOCK_PRODUCTS.find(p => p.id === currentProductId)?.name : null;

    const prompt = `
      You are an expert e-commerce recommendation system for "PASMAB COMERCIAL", a premier retailer in Angola.
      Currency used is Angolan Kwanza (Kz).
      
      CATALOG:
      ${JSON.stringify(catalogSubset)}

      USER CONTEXT:
      - Recently Viewed: ${historyNames.join(', ')}
      - In Cart: ${cartNames.join(', ')}
      ${currentName ? `- Currently Looking At: ${currentName}` : ''}

      TASK:
      Recommend exactly 4 product IDs from the CATALOG that the user is most likely to buy. 
      Prioritize products in similar categories or complementary items (cross-sell).
      Try to suggest products that could increase the Average Order Value (upsell).
      Exclude the "Currently Looking At" product ID: "${currentProductId}" if possible.

      Return ONLY a JSON array of strings containing the product IDs.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const recommendedIds = JSON.parse(response.text || "[]");
    return Array.isArray(recommendedIds) ? recommendedIds : [];
  } catch (error) {
    console.error("Failed to fetch AI recommendations:", error);
    // Fallback to simple category-based shuffle if AI fails
    return MOCK_PRODUCTS.slice(0, 4).map(p => p.id);
  }
};
