import { ChatOpenAI } from "@langchain/openai";


export const llm = new ChatOpenAI({
  model: "mistralai/mistral-7b-instruct",
  temperature: 0.7,
  apiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
});

