import { OpenAI } from "openai/index.mjs";

const supportedTags = ["Software", "Marketing", "Healthcare", "Law", "Finance"];
const openai = new OpenAI({ apiKey: "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", dangerouslyAllowBrowser: true });

export default async function generateTags(text: String) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `I have a listed of tags corresponding to common job roles: ${supportedTags}. Based on the following resume content: ${text}, identify the most relevant tag. If it does not fit any, return None. I only want the tag name. Do not include any other extra text` }],
    model: "gpt-3.5-turbo",
    max_tokens: 20,
  });
  return completion.choices[0];
}
