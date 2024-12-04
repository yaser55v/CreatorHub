// aiService.ts
import OpenAI from "openai";
const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: import.meta.env.VITE_GITHUB_TOKEN, // Use GitHub token
  dangerouslyAllowBrowser: true,
});

export async function generateContentStrategy(form: {
  platform: string;
  niche: string;
  goal: string;
}) {
  const prompt = `
You are an expert in social media growth and strategy. Your task is to create a professional and actionable content strategy for a ${form.niche} creator on ${form.platform}. 

The goal is to ${form.goal === "increase_followers" ? "significantly grow their followers." : form.goal === "boost_engagement" ? "boost engagement metrics such as likes, shares, and comments." : "monetize their content effectively."}

Provide the strategy in the following sections:
1. Daily Content Ideas: Specific and easy-to-execute ideas.
2. Weekly Focus: Tactical goals for each week.
3. Metrics to Track: Key metrics to measure success.
4. Tools to Use: Recommended tools to optimize this strategy.
  `;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a social media strategy expert." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
    });

    return (
      response.choices[0].message.content || "Unable to generate a strategy."
    );
  } catch (error) {
    console.error("Strategy generation error:", error);
    throw new Error("Failed to generate content strategy");
  }
}

