import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (prompt: string, history: any[]) => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined") {
    console.error("API_KEY no configurada");
    return "¡Hola! Estoy esperando que el administrador configure mi clave de acceso. Mientras tanto, puedes contactar a Patricia por WhatsApp.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const formattedHistory = history.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: String(m.text || "") }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "Eres el Asistente de Farmatotal Mendoza. Responde de forma muy amable, profesional y breve. Eres experto en diabetes. Si la duda es médica grave, redirige siempre a Patricia o a un médico.",
        temperature: 0.7,
      },
    });

    return response.text || "No logré procesar tu consulta, ¿podrías repetirla?";
  } catch (error: any) {
    console.error("Error en Gemini:", error);
    return "Lo siento, tuve un problema de conexión. Por favor, intenta de nuevo en unos segundos.";
  }
};