
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const getGeminiResponse = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  if (!API_KEY) {
    return "Error: API Key no configurada. Por favor, contacte al administrador.";
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `
          Eres un asistente experto de Farmatotal especializado en el cuidado de la diabetes. 
          Tu objetivo es proporcionar información educativa, consejos de salud y guiar a los usuarios en el uso de productos de farmacia. 
          IMPORTANTE: 
          1. NO recetes medicamentos.
          2. Ante emergencias médicas, siempre indica al usuario que llame al 911 o acuda a urgencias.
          3. Sé amable, profesional y empático.
          4. Si el usuario pregunta por productos, menciona que puede verlos en la sección "Comprar" de la app.
          5. Tu tono debe ser alentador y claro.
        `,
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "No pude generar una respuesta en este momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Lo siento, hubo un problema técnico al procesar tu consulta.";
  }
};

export const summarizeHealthProgress = async (readings: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analiza estas mediciones de glucosa y dame un resumen corto (2 frases) y alentador: ${readings}`,
    });
    return response.text;
  } catch (error) {
    return "Sigue así, cada medición cuenta para tu bienestar.";
  }
};
