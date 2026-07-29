import { NextResponse, type NextRequest } from "next/server";

function extractMetaContent(html: string, property: string) {
  const propFirst = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["'][^>]*>`,
    "i",
  );
  const contentFirst = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${property}["'][^>]*>`,
    "i",
  );
  const match = html.match(propFirst) ?? html.match(contentFirst);
  return match?.[1]?.trim() || undefined;
}

function extractTitleTag(html: string) {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1]?.trim() || undefined;
}

function resolveUrl(maybeRelative: string, base: string) {
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return "";
  }
}

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "url 쿼리 파라미터가 필요합니다." }, { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    return NextResponse.json({ error: "올바르지 않은 URL입니다." }, { status: 400 });
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return NextResponse.json({ error: "http(s) URL만 지원합니다." }, { status: 400 });
  }

  try {
    const response = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OneBiteLinkBot/1.0)",
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(`요청 실패: ${response.status}`);
    }

    const html = await response.text();

    const title = extractMetaContent(html, "og:title") ?? extractTitleTag(html) ?? parsedUrl.hostname;
    const description = extractMetaContent(html, "og:description") ?? extractMetaContent(html, "description") ?? "";
    const rawThumbnail = extractMetaContent(html, "og:image");
    const thumbnail = rawThumbnail ? resolveUrl(rawThumbnail, parsedUrl.toString()) : "";

    return NextResponse.json({
      title,
      description,
      thumbnail,
      url: parsedUrl.toString(),
    });
  } catch {
    return NextResponse.json(
      { error: "오픈 그래프 정보를 가져오지 못했습니다." },
      { status: 502 },
    );
  }
}
