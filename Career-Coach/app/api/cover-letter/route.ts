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

Rules:
- Professional tone
- 3–4 paragraphs
- Strong closing
`;

    const response = await llm.invoke(prompt);

    return NextResponse.json({
      success: true,
      coverLetter: response.content,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Generation failed" },
      { status: 500 }
    );
  }
}
