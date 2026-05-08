import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest
) {

  try {

    const body = await req.json();

    const {
      role,
      level,
      question,
      answer,
    } = body;

    // VALIDATION
    if (!question || !answer) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Question and answer are required",
        },
        {
          status: 400,
        }
      );
    }

    // CALL ML API
    const response = await fetch(
      "https://akash150-ai-interview-fastapi.hf.space/predict",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          question,
          answer,
        }),
      }
    );

    // HANDLE API ERROR
    if (!response.ok) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Failed to fetch ML prediction",
        },
        {
          status: 500,
        }
      );
    }

    // GET ML RESULT
    const data = await response.json();

    // FIX NaN ERROR
    const technicalScore =
      data?.technical_score &&
      !isNaN(data.technical_score)
        ? Math.round(
            Number(
              data.technical_score
            )
          )
        : 0;

    const communicationScore =
      data?.communication_score &&
      !isNaN(
        data.communication_score
      )
        ? Math.round(
            Number(
              data.communication_score
            )
          )
        : 0;

    // RETURN RESULT
    return NextResponse.json({

      success: true,

      role,

      level,

      question,

      answer,

      technical_score:
        technicalScore,

      communication_score:
        communicationScore,

      technical_label:
        data?.technical_label ||
        "Average",

      communication_label:
        data?.communication_label ||
        "Average",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}