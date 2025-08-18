import { generateRobotsTxt } from "@/lib/seo";
import { NextResponse } from "next/server";

export async function GET() {
  const robotsTxt = generateRobotsTxt();

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
