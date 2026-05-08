import { NextRequest, NextResponse } from "next/server"
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
} from "docx"

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

    const markdown = body.markdown

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: markdown
            .split("\n")
            .map(
              (line: string) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: line,
                    }),
                  ],
                })
            ),
        },
      ],
    })

    const blob = await Packer.toBlob(doc)

    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

        "Content-Disposition":
          'attachment; filename="resume.docx"',
      },
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        success: false,
        message: "Word generation failed",
      },
      {
        status: 500,
      }
    )
  }
}