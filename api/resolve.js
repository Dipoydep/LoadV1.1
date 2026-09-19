import { detectPlatform } from "../lib/validator.js";
import { resolveInstagram } from "../lib/instagram.js";
import { resolveTikTok } from "../lib/tiktok.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      endpoint: "resolve",
      status: "online"
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["GET", "POST"]);

    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  try {
    const { url } = req.body || {};

    if (!url || typeof url !== "string") {
      return res.status(400).json({
        success: false,
        error: "URL is required"
      });
    }

    const platform = detectPlatform(url);

    if (!platform) {
      return res.status(400).json({
        success: false,
        error: "Unsupported or invalid URL"
      });
    }

    let result;

    if (platform === "instagram") {
      result = await resolveInstagram(url);
    }

    if (platform === "tiktok") {
      result = await resolveTikTok(url);
    }

    return res.status(200).json({
      success: true,
      platform,
      ...result
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Failed to resolve URL"
    });
  }
}
