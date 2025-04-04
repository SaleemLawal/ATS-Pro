"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const date = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export async function generateCoverLetter(
  jobTitle: string,
  jobDescription: string,
  companyName: string
) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `You are a professional resume reviewer. Make a cover letter for a ${jobTitle} position based on the following job description and company name: ${jobDescription} at ${companyName}. I want it in this format:
            ${date}
            content
            Sincerely,
            [Your Name]
          `,
        },
        {
          role: "user",
          content: `Here is a cover letter for a ${jobTitle} position for ${jobDescription} at ${companyName} on ${date}. I want the date to appear at the top of the letter and generate a cover letter that is at between 300-500 words long.`,
        },
      ],
    });

    const message = completion?.choices[0].message.content;
    if (!message) return { success: false, message: "No message from AI" };
    return { success: true, message: message };

    // const raw = message.trim();
    // const cleaned = raw.replace(/^```json\s*|```$/g, "");

    // const parsed = ResumeAnalysisSchema.safeParse(JSON.parse(cleaned));

    // if (!parsed.success)
    //   throw new Error("Validation failed, try uploading resume again");

    // return parsed.data;
  } catch (error) {
    console.error("Error analyzing resume:", error);
  }
}
