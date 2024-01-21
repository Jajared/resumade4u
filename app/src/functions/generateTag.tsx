import { OpenAI } from "openai/index.mjs";

const openai = new OpenAI({ apiKey: "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", dangerouslyAllowBrowser: true });

export default async function generateTags(text: String) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `Based on the following resume content: ${text}, give the most relevant job field. Return me only one field name. Nothing else` }],
    model: "gpt-3.5-turbo",
    max_tokens: 20,
  });
  return completion.choices[0];
}
