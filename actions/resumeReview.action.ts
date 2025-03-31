"use server";
import { mockAnalysis } from "@/lib/mockAnalysis";
import { ResumeAnalysisSchema } from "@/schema/analysisSchema";
import OpenAI from "openai";
import pdf from "pdf-parse/lib/pdf-parse";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API,
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "My Resume Analyzer App",
  },
});

export async function analyzeResume(buffer: any, role: string) {
  try {
    const data = await pdf(buffer);
    const resumeContent = data.text;

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-pro-exp-03-25:free",
      messages: [
        {
          role: "system",
          content: `You are a professional resume reviewer. Analyze resumes and return your analysis as a **valid JSON object** matching this exact structure:

                {
                  "score": number (0-100),
                  "summary": string,
                  "strengths": string[],
                  "weaknesses": string[],
                  "suggestions": [
                    {
                      "section": string,
                      "original": string (optional),
                      "improved": string,
                      "explanation": string
                    }
                  ],
                  "keywordMatch": [
                    {
                      "keyword": string,
                      "found": boolean,
                      "importance": "high" | "medium" | "low"
                    }
                  ],
                  "sectionScores": [
                    {
                      "name": string,
                      "score": number,
                      "feedback": string
                    }
                  ]
                }

                ❗ Do not include any text before or after the JSON.
                ❗ Do not write explanations or commentary.
                ❗ Only return valid JSON — nothing else.
                ❗ Do not wrap the JSON in triple backticks or label it with json
                ❗ Only return raw JSON with no formatting
                `,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Here is a resume for a ${role} position:\n\n${resumeContent}`,
            },
          ],
        },
      ],
    });

    const message = completion?.choices[0].message.content;
    if (!message) throw new Error("No message from AI");

    const raw = message.trim();
    const cleaned = raw.replace(/^```json\s*|```$/g, "");

    const parsed = ResumeAnalysisSchema.safeParse(JSON.parse(cleaned));

    if (!parsed.success)
      throw new Error("Validation failed, try uploading resume again");

    return parsed.data;
  } catch (error) {
    console.error("Error analyzing resume:", error);
  }
}
