import { NextResponse } from "next/server";
import { llm } from "@/lib/llm";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
Write a professional cover letter.

Name: ${body.name}
Role: ${body.jobRole}
Company: ${body.company}
Experience: ${body.experience}
Skills: ${body.skills}

Rules (VERY IMPORTANT):
- Output ONLY normal plain text
- DO NOT use markdown
- DO NOT use **bold**
- DO NOT use bullet points
- DO NOT use emojis
- Use normal paragraphs
- Use line breaks only
- Keep it ATS friendly
- Write 3 to 4 paragraphs with a strong closing
`;

    const response = await llm.invoke(prompt);

    return NextResponse.json({
      success: true,
      coverLetter: response.content,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Generation failed" },
      { status: 500 }
    );
  }
}
