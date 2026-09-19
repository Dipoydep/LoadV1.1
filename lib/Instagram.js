export async function resolveInstagram(url) {
  return {
    type: "unknown",

    profile: {
      username: null,
      name: null,
      avatar: null
    },

    caption: null,
    thumbnail: null,

    formats: {
      mp3: false,
      mp4: false
    },

    sourceUrl: url
  };
}
