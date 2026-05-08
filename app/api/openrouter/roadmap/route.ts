import { NextRequest, NextResponse } from "next/server";

function extractJSON(text: string) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error("Invalid JSON output from model");
  }
  return JSON.parse(match[0]);
}

export async function POST(req: NextRequest) {
  try {
    const { role } = await req.json();

    console.log("Roadmap request role:", role);


    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openrouter/auto",
          temperature: 0.3,
          messages: [
            {
              role: "system",
              content: `
Return ONLY a JSON object.
No markdown.
No explanation.

JSON format:
{
  "title": "Roadmap title",
  "duration": "X months",
  "nodes": [
    { "id": 1, "title": "Step", "description": "Explanation" }
  ]
}
              `.trim(),
            },
            {
              role: "user",
              content: `Create a roadmap for ${role}`,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const raw = data.choices[0].message.content;
    console.log("RAW MODEL OUTPUT:", raw);

    const parsed = extractJSON(raw);

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Roadmap API Error:", error.message);

    return NextResponse.json(
      { error: "Failed to generate roadmap" },
      { status: 500 }
    );
  }
}
