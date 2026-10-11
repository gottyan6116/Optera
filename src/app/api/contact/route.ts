import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validation";
import { contactConfigured, siteUrl } from "@/lib/config";
export const runtime = "nodejs";
const response = (body: object, status: number) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    let sameHost = false;
    try {
      const parsed = new URL(origin);
      sameHost =
        ["https:", "http:"].includes(parsed.protocol) &&
        parsed.host === request.headers.get("host");
    } catch {}
    if (
      !sameHost &&
      origin !== new URL(request.url).origin &&
      origin !== siteUrl()
    )
      return response({ error: "このページからもう一度お試しください。" }, 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json"))
    return response({ error: "JSON形式で送信してください。" }, 415);
  if (Number(request.headers.get("content-length") || 0) > 16384)
    return response({ error: "送信内容が大きすぎます。" }, 413);
  let raw: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader)
      return response({ error: "入力内容を確認してください。" }, 400);
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) {
        await reader.cancel();
        return response({ error: "送信内容が大きすぎます。" }, 413);
      }
      chunks.push(value);
    }
    raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return response({ error: "入力内容を確認してください。" }, 400);
  }
  const result = validateContact(raw);
  if (!result.data)
    return response(
      { error: "入力内容を確認してください。", errors: result.errors },
      400,
    );
  if (!contactConfigured())
    return response(
      {
        error:
          "現在は確認用フォームです。相談内容は送信・保存されていません。受付開始後にご利用ください。",
        mode: "development",
      },
      503,
    );
  try {
    const res = await fetch(process.env.CONTACT_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}`,
      },
      body: JSON.stringify({
        ...result.data,
        source: "optera-consultation",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
      cache: "no-store",
    });
    if (!res.ok)
      return response(
        {
          error:
            "送信先で受付を確認できませんでした。時間をおいてもう一度お試しください。",
        },
        502,
      );
    return response({ success: true }, 200);
  } catch {
    return response(
      {
        error:
          "送信先との通信に失敗しました。時間をおいてもう一度お試しください。",
      },
      502,
    );
  }
}
