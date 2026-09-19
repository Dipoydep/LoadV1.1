import { detectPlatform } from "../lib/validator.js";
import { resolveInstagram } from "../lib/instagram.js";
import { resolveTikTok } from "../lib/tiktok.js";

export async function GET() {
  return Response.json({
    success: true,
    endpoint: "resolve",
    status: "online"
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const url = body?.url;

    if (!url || typeof url !== "string") {
      return Response.json(
        {
          success: false,
          error: "URL is required"
        },
        { status: 400 }
      );
    }

    const platform = detectPlatform(url);

    if (!platform) {
      return Response.json(
        {
          success: false,
          error: "Unsupported or invalid URL"
        },
        { status: 400 }
      );
    }

    let result;

    if (platform === "instagram") {
      result = await resolveInstagram(url);
    } else if (platform === "tiktok") {
      result = await resolveTikTok(url);
    }

    return Response.json({
      success: true,
      platform,
      ...result
    });
  } catch (error) {
    console.error("Resolve error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to resolve URL"
      },
      { status: 500 }
    );
  }
}
