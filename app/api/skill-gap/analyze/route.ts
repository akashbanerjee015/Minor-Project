import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  try {

    const {
      jobRole,
      skills,
    } = await req.json();

    // VALIDATION
    if (!jobRole || !skills) {

      return NextResponse.json(
        {
          error:
            "Job role and skills are required",
        },
        {
          status: 400,
        }
      );
    }

    const apiKey =
      process.env.OPENROUTER_API_KEY;

    if (!apiKey) {

      return NextResponse.json(
        {
          error:
            "OPENROUTER_API_KEY not configured",
        },
        {
          status: 500,
        }
      );
    }

    // AI PROMPT
    const prompt = `
You are an AI Skill Gap Analyzer.

Analyze the candidate skills for the target role.

Target Job Role:
${jobRole}

Candidate Skills:
${skills}

Return ONLY valid JSON in this exact format:

{
  "matchScore": 75,
  "matchedSkills": [
    "React",
    "JavaScript"
  ],
  "missingSkills": [
    "Docker",
    "AWS"
  ],
  "recommendations": [
    "Learn Docker basics",
    "Practice AWS deployment"
  ]
}

Rules:
- matchScore must be integer
- no markdown
- no explanation
- valid JSON only
`;

    // OPENROUTER API
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${apiKey}`,

          "HTTP-Referer":
            "http://localhost:3000",

          "X-Title":
            "AI Career Coach",
        },

        body: JSON.stringify({

          model:
            "openrouter/free",

          temperature: 0.7,

          max_tokens: 700,

          messages: [
            {
              role: "system",

              content:
                "You are a professional AI Skill Gap Analyzer.",
            },

            {
              role: "user",

              content: prompt,
            },
          ],
        }),
      }
    );

    const data =
      await response.json();

    // HANDLE ERROR
    if (!response.ok) {

      console.error(
        "Skill Gap Error:",
        data
      );

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "OpenRouter request failed",
        },
        {
          status: 500,
        }
      );
    }

    // GET AI RESPONSE
    const reply =
      data?.choices?.[0]?.message
        ?.content;

    if (!reply) {

      return NextResponse.json(
        {
          error:
            "No response from AI",
        },
        {
          status: 500,
        }
      );
    }

    // PARSE JSON
    let parsedResult;

    try {

      parsedResult =
        JSON.parse(reply);

    } catch (error) {

      console.error(error);

      return NextResponse.json(
        {
          error:
            "Invalid AI JSON response",
        },
        {
          status: 500,
        }
      );
    }

    // RETURN RESULT
    return NextResponse.json({

      matchScore:
        parsedResult.matchScore || 0,

      matchedSkills:
        parsedResult.matchedSkills || [],

      missingSkills:
        parsedResult.missingSkills || [],

      recommendations:
        parsedResult.recommendations || [],
    });

  } catch (error: any) {

    console.error(
      "Skill Gap Server Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error.message ||
          "Server error",
      },
      {
        status: 500,
      }
    );
  }
}