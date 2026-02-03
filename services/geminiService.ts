import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateThesisIdeas = async (interests: string[]): Promise<string> => {
  try {
    const prompt = `
      Ești un asistent academic pentru studenți. 
      Studentul are următoarele interese: ${interests.join(', ')}.
      
      Generează 3 idei de teme de licență/disertație inovatoare și relevante pentru aceste interese.
      Pentru fiecare idee, oferă:
      1. Un titlu atractiv.
      2. O scurtă descriere (max 2 propoziții).
      3. Tehnologii sugerate.

      Formatează răspunsul în Markdown clar.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || 'Nu s-au putut genera idei momentan.';
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Eroare la conectarea cu asistentul AI. Verifică cheia API.";
  }
};

export const summarizeProject = async (description: string, tasks: string[]): Promise<string> => {
    try {
        const prompt = `
          Rezumat de progres pentru proiect.
          Descriere temă: ${description}
          Task-uri curente: ${tasks.join(', ')}
          
          Generează un scurt raport de status profesional (max 50 cuvinte) pentru coordonator.
        `;
    
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });
    
        return response.text || 'Nu s-a putut genera rezumatul.';
      } catch (error) {
        console.error("Gemini Error:", error);
        return "Eroare AI.";
      }
}
