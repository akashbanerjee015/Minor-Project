import { NextResponse } from 'next/server'

const ML_URL =
  process.env.ML_SERVICE_URL ||
  'https://akash150-resume-analyzer-fastapi.hf.space/predict-pdf';


export const runtime = 'nodejs';

export async function POST(req: Request) {
  console.log('[next api] /api/upload-resume called');
  console.log('[next api] forwarding to ML_URL=', ML_URL);

  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;

    if (!file) {
      console.warn('[next api] no file found in form data');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const filename = file.name || 'upload.pdf';
    const contentType = file.type || 'application/pdf';
    const arrayBuffer = await file.arrayBuffer();

    console.log(
      `[next api] received file ${filename} (${contentType}) size=${arrayBuffer.byteLength}`
    );

    const forwardForm = new FormData();
    forwardForm.append(
      'file',
      new Blob([arrayBuffer], { type: contentType }),
      filename
    );

    // Timeout protection
    const controller = new AbortController();
    const timeoutMs = Number(process.env.ML_FORWARD_TIMEOUT_MS || 15000);
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    let resp: Response;

    try {
      resp = await fetch(ML_URL, {
        method: 'POST',
        body: forwardForm,
        signal: controller.signal,

        //  REQUIRED SO HUGGINGFACE RETURNS JSON, NOT HTML
        headers: {
          Accept: 'application/json',
        },
      });
    } catch (ferr: any) {
      clearTimeout(timer);
      console.error('[next api] error forwarding to ML service:', ferr);

      const message =
        ferr.name === 'AbortError'
          ? `ML service request timed out after ${timeoutMs}ms`
          : String(ferr);

      return NextResponse.json({ error: message }, { status: 502 });
    }

    clearTimeout(timer);

    const status = resp.status;
    const text = await resp.text();

    console.log(
      `[next api] ML service responded status=${status} body=${text.slice(0, 200)}`
    );

    // Attempt JSON parse
    try {
      const json = JSON.parse(text);
      return NextResponse.json(json, { status });
    } catch (e) {
      console.warn('[next api] ML returned non-JSON response');
      return new NextResponse(text, { status });
    }
  } catch (err: any) {
    console.error('[next api] error in /api/upload-resume:', err);

    return NextResponse.json(
      {
        error: String(err),
        stack: err?.stack?.toString?.().slice(0, 200),
      },
      { status: 500 }
    );
  }
}
