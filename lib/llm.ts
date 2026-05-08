import { ChatOpenAI } from "@langchain/openai";


export const llm = new ChatOpenAI({
  model: "openrouter/free",
  temperature: 0.7,
  apiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
});

