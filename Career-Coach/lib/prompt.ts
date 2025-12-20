import { PromptTemplate } from "@langchain/core/prompts";

export const coverLetterPrompt = PromptTemplate.fromTemplate(`
Write a professional cover letter.

Name: {name}
Role: {jobRole}
Company: {company}
Experience: {experience}
Skills: {skills}
`);
