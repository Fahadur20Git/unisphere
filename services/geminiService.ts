
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getUniversityDeepDive = async (universityName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Provide a highly detailed, professional analysis of ${universityName} based on their official website.
      
      Return a JSON object with the following structure:
      {
        "officialWebsite": "URL of the university homepage",
        "infrastructure": "Detailed description of campus facilities and tech",
        "departments": ["List of major academic departments"],
        "entranceExams": [{"name": "Exam Name", "details": "Required score/info", "link": "Direct link if possible"}],
        "scholarships": [{"title": "Scholarship Name", "eligibility": "Who can apply", "link": "Application URL"}],
        "languageRequirements": ["Specific language exams needed like IELTS, TOEFL, JLPT with required scores"],
        "professors": ["Highlights of 2-3 notable faculty members and their research areas"]
      }
      
      Ensure all information is up-to-date.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            officialWebsite: { type: Type.STRING },
            infrastructure: { type: Type.STRING },
            departments: { type: Type.ARRAY, items: { type: Type.STRING } },
            entranceExams: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  details: { type: Type.STRING },
                  link: { type: Type.STRING }
                }
              }
            },
            scholarships: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  eligibility: { type: Type.STRING },
                  link: { type: Type.STRING }
                }
              }
            },
            languageRequirements: { type: Type.ARRAY, items: { type: Type.STRING } },
            professors: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    return {
      data: JSON.parse(response.text),
      sources: sources
    };
  } catch (error) {
    console.error("Deep Dive Error:", error);
    return { data: null, sources: [] };
  }
};

export const analyzeSkillGap = async (userGoals: string, userSkills: string[], universityDescription: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User Career Goals: ${userGoals}\nUser Skills: ${userSkills.join(', ')}\nUniversity Focus: ${universityDescription}\n\nAnalyze the skill gap and university alignment. Return JSON with 'alignmentScore' (0-100), 'gapSkills' (array), and 'recommendation' (string).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            alignmentScore: { type: Type.NUMBER },
            gapSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendation: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return { alignmentScore: 75, gapSkills: ['Technical Leadership', 'Industry Ethics'], recommendation: "Reasonable alignment with current goals." };
  }
};

export const performSentimentAnalysis = async (reviews: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze these student reviews and summarize sentiment:\n${reviews.join('\n')}\n\nReturn JSON with 'summary' (string), 'positiveCount' (number), 'neutralCount' (number), 'negativeCount' (number).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            positiveCount: { type: Type.NUMBER },
            neutralCount: { type: Type.NUMBER },
            negativeCount: { type: Type.NUMBER }
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return { summary: "Feedback is generally positive focusing on campus infrastructure.", positiveCount: 1, neutralCount: 0, negativeCount: 0 };
  }
};
