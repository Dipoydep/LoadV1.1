import { detectPlatform } from "../lib/validator.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);

    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  const { url, format } = req.query;

  if (!url) {
    return res.status(400).json({
      success: false,
      error: "URL is required"
    });
  }

  if (!["mp3", "mp4"].includes(format)) {
    return res.status(400).json({
      success: false,
      error: "Format must be mp3 or mp4"
    });
  }

  const platform = detectPlatform(url);

  if (!platform) {
    return res.status(400).json({
      success: false,
      error: "Unsupported or invalid URL"
    });
  }

  return res.status(501).json({
    success: false,
    error: "Download resolver is not implemented yet",
    platform,
    format
  });
}
