// Isolated world: relays settings from extension storage to the page-world script.
const send = () =>
  chrome.storage.local.get({ quality: "hd1080", autopause: false }).then((s) =>
    document.dispatchEvent(new CustomEvent("autoyt-settings", { detail: JSON.stringify(s) })));

send();
chrome.storage.onChanged.addListener(send);
document.addEventListener("autoyt-ready", send); // main.js may load after our first send
