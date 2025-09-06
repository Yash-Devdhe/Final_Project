
import { GoogleGenAI, Type } from "@google/genai";
import type { SalesData } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using mocked responses.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const analyticsSchema = {
    type: Type.OBJECT,
    properties: {
        forecast: {
            type: Type.ARRAY,
            description: "6-month revenue forecast. Each item should have a month (e.g., 'Jul 24') and predictedRevenue.",
            items: {
                type: Type.OBJECT,
                properties: {
                    month: { type: Type.STRING },
                    predictedRevenue: { type: Type.NUMBER }
                }
            }
        },
        customerSegments: {
            type: Type.ARRAY,
            description: "Customer segmentation. Each item is a segment with a name (e.g., 'High-Value') and a value representing percentage or count.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    value: { type: Type.NUMBER }
                }
            }
        },
        productTrends: {
            type: Type.ARRAY,
            description: "Top 5 selling products. Each item has a product name and the total units sold.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    unitsSold: { type: Type.NUMBER }
                }
            }
        },
        anomalies: {
            type: Type.STRING,
            description: "A single, concise sentence identifying one key anomaly or an interesting insight from the data. E.g., 'A significant spike in sales for Product X was observed in May.'"
        }
    }
};

export async function generateAnalytics(salesData: SalesData[]) {
    // If no API key, return a mock response to avoid errors.
    if (!process.env.API_KEY) {
        return getMockAnalytics();
    }
    
    const prompt = `
    Analyze the following e-commerce sales data and provide insights. The data is a JSON array of sales records.
    
    Data:
    ${JSON.stringify(salesData.slice(0, 50))} // Use a subset of data to keep prompt concise

    Based on this data, please generate:
    1. A 6-month sales revenue forecast starting from the month after the last data point.
    2. A breakdown of customer segments into categories like 'High-Value', 'Repeat Buyers', and 'New Customers'.
    3. A list of the top 5 selling products by units sold. The product IDs are strings; invent plausible product names for them.
    4. A single, concise sentence identifying a key anomaly or insight.
    
    Return the entire output in a single JSON object matching the provided schema.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: analyticsSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error generating analytics with Gemini:", error);
        // Fallback to mock data on API error
        return getMockAnalytics();
    }
}

function getMockAnalytics() {
    return {
        forecast: [
            { month: 'Jul 24', predictedRevenue: 62000 },
            { month: 'Aug 24', predictedRevenue: 65000 },
            { month: 'Sep 24', predictedRevenue: 68000 },
            { month: 'Oct 24', predictedRevenue: 72000 },
            { month: 'Nov 24', predictedRevenue: 85000 },
            { month: 'Dec 24', predictedRevenue: 98000 },
        ],
        customerSegments: [
            { name: 'High-Value', value: 25 },
            { name: 'Repeat Buyers', value: 45 },
            { name: 'New Customers', value: 20 },
            { name: 'At Risk', value: 10 },
        ],
        productTrends: [
            { name: 'Quantum Laptops', unitsSold: 180 },
            { name: 'Stellar Smartwatches', unitsSold: 250 },
            { name: 'Galaxy Tablets', unitsSold: 210 },
            { name: 'Nova Headphones', unitsSold: 300 },
            { name: 'Eclipse Drones', unitsSold: 150 },
        ],
        anomalies: "There was an unexpected 30% surge in sales for 'Nova Headphones' in April, potentially due to a successful marketing campaign."
    };
}
