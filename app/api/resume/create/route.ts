import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body.markdown) {
      return NextResponse.json(
        {
          success: false,
          message: "Resume markdown is required",
        },
        {
          status: 400,
        }
      )
    }

    console.log("Resume Saved Successfully")

    return NextResponse.json({
      success: true,
      message: "Resume saved successfully",
      data: body.markdown,
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    )
  }
}