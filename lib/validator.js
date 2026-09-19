export function detectPlatform(input) {
  try {
    const url = new URL(input.trim());

    if (!["http:", "https:"].includes(url.protocol)) {
      return null;
    }

    const hostname = url.hostname
      .toLowerCase()
      .replace(/^www\./, "");

    if (
      hostname === "instagram.com" ||
      hostname.endsWith(".instagram.com")
    ) {
      return "instagram";
    }

    if (
      hostname === "tiktok.com" ||
      hostname.endsWith(".tiktok.com")
    ) {
      return "tiktok";
    }

    return null;
  } catch {
    return null;
  }
}
