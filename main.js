// Page world: has access to YouTube's player API.
let settings = { quality: "hd1080", autopause: false };
const ORDER = ["tiny", "small", "medium", "large", "hd720", "hd1080", "hd1440", "hd2160", "hd2880", "highres"]; // low → high

const apply = () => {
  const p = document.getElementById("movie_player");
  if (settings.quality === "default" || !p?.setPlaybackQualityRange) return;
  // Highest first, e.g. ["hd1080", "hd720", ..., "auto"]. Empty until the video's formats load; "playing" retries.
  const levels = p.getAvailableQualityLevels().filter((q) => ORDER.includes(q));
  if (!levels.length) return;
  // Chosen quality, else the closest below it; if the video has nothing that low, its lowest.
  const rank = ORDER.indexOf(settings.quality);
  const q = levels.find((l) => ORDER.indexOf(l) <= rank) ?? levels[levels.length - 1];
  if (p.getPlaybackQuality() !== q) p.setPlaybackQualityRange(q, q);
};

document.addEventListener("autoyt-settings", (e) => {
  settings = JSON.parse(e.detail);
  apply();
});

// Media events don't bubble, so listen in the capture phase. Fires on every new video, incl. SPA navigation.
document.addEventListener("loadstart", (e) => {
  apply();
  if (settings.autopause) e.target.addEventListener("playing", () => e.target.pause(), { once: true });
}, true);
document.addEventListener("playing", apply, true); // player isn't always ready at loadstart

document.dispatchEvent(new CustomEvent("autoyt-ready"));
