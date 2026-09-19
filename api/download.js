import { detectPlatform } from "../lib/validator.js";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const url = searchParams.get("url");
  const format = searchParams.get("format");

  if (!url) {
    return Response.json(
      {
        success: false,
        error: "URL is required"
      },
      { status: 400 }
    );
  }

  if (!["mp3", "mp4"].includes(format)) {
    return Response.json(
      {
        success: false,
        error: "Format must be mp3 or mp4"
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

  return Response.json(
    {
      success: false,
      error: "Download resolver is not implemented yet",
      platform,
      format
    },
    { status: 501 }
  );
}
