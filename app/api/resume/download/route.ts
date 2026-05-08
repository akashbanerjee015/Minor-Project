import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body.markdown) {
      return NextResponse.json(
        {
          success: false,
          message: "Resume markdown required",
        },
        {
          status: 400,
        }
      )
    }

    return NextResponse.json({
      success: true,
      message: "PDF generation successful",
      data: body.markdown,
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        success: false,
        message: "PDF generation failed",
      },
      {
        status: 500,
      }
    )
  }
}