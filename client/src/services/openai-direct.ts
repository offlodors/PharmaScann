// Direct OpenAI service for mobile app (no backend)
import type { MedicationAnalysis } from "@shared/schema";

// This will be set by the user through the app settings
let openaiApiKey: string | null = null;

export const setOpenAIKey = (key: string) => {
  openaiApiKey = key;
  localStorage.setItem('openai_api_key', key);
};

export const getOpenAIKey = (): string | null => {
  if (openaiApiKey) return openaiApiKey;
  
  // Try to get from localStorage
  if (typeof window !== 'undefined') {
    openaiApiKey = localStorage.getItem('openai_api_key');
  }
  
  return openaiApiKey;
};

export const hasOpenAIKey = (): boolean => {
  return !!getOpenAIKey();
};

export async function analyzeMedicationImageDirect(base64Image: string, language: string = 'en'): Promise<MedicationAnalysis> {
  let apiKey = getOpenAIKey();
  
  // Fallback to environment variable for web/development
  if (!apiKey && typeof window !== 'undefined') {
    apiKey = import.meta.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  }
  
  if (!apiKey) {
    throw new Error('OpenAI API key not configured. Please configure it in app settings or contact support.');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a pharmaceutical expert AI that analyzes medication images. Analyze the provided image and identify the medication. Return a JSON object with the following structure:
            {
              "brandName": "string - brand/trade name of the medication",
              "genericName": "string - generic/chemical name",
              "strength": "string - dosage strength (e.g., 500mg)",
              "form": "string - medication form (tablets, capsules, etc.)",
              "activeIngredients": [
                {
                  "name": "string - ingredient name",
                  "amount": "string - amount per dose",
                  "description": "string - easy-to-understand explanation of what this ingredient does",
                  "purposes": ["array of strings - what conditions this treats"]
                }
              ],
              "commonUses": ["array of strings - common conditions this medication treats"],
              "safetyInfo": ["array of strings - important safety warnings"],
              "identified": boolean - true if medication was successfully identified,
              "confidence": number - confidence score from 0 to 1
            }
            
            IMPORTANT: Respond in ${language === 'es' ? 'Spanish' : 'English'} language. All text fields including descriptions, purposes, common uses, and safety information must be in ${language === 'es' ? 'Spanish' : 'English'}. Provide clear, easy-to-understand explanations suitable for general public. Focus on practical information about what the medication does and how it helps. If you cannot identify the medication clearly, set identified to false and provide general safety advice.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Please analyze this medication image and provide detailed information about the product, its ingredients, and their purposes in an easy-to-understand format. Respond in ${language === 'es' ? 'Spanish' : 'English'}.`
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ],
          },
        ],
        response_format: { type: "json_object" },
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`OpenAI API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content || "{}";
    
    let result;
    try {
      result = JSON.parse(content);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response as JSON:", parseError);
      throw new Error('Invalid response format from OpenAI');
    }
    
    // Validate and provide defaults for required fields
    const unknownProduct = language === 'es' ? "Producto Desconocido" : "Unknown Product";
    const notIdentified = language === 'es' ? "No identificado" : "Not identified";
    const unknown = language === 'es' ? "Desconocido" : "Unknown";
    const consultProfessional = language === 'es' 
      ? "Consulte a un profesional de la salud antes del uso" 
      : "Consult healthcare professional before use";
    
    return {
      brandName: result.brandName || unknownProduct,
      genericName: result.genericName || notIdentified,
      strength: result.strength || unknown,
      form: result.form || unknown,
      activeIngredients: result.activeIngredients || [],
      commonUses: result.commonUses || [],
      safetyInfo: result.safetyInfo || [consultProfessional],
      identified: result.identified || false,
      confidence: Math.max(0, Math.min(1, result.confidence || 0))
    };
    
  } catch (error) {
    console.error("Error analyzing medication image:", error);
    const analysisFailed = language === 'es' ? "Análisis Fallido" : "Analysis Failed";
    const unableToIdentify = language === 'es' ? "No se pudo identificar" : "Unable to identify";
    const unknown = language === 'es' ? "Desconocido" : "Unknown";
    const errorMessage = language === 'es' 
      ? "No se pudo analizar la imagen. Por favor consulte a un profesional de la salud."
      : "Unable to analyze image. Please consult a healthcare professional.";
    
    return {
      brandName: analysisFailed,
      genericName: unableToIdentify,
      strength: unknown,
      form: unknown,
      activeIngredients: [],
      commonUses: [],
      safetyInfo: [errorMessage],
      identified: false,
      confidence: 0
    };
  }
}