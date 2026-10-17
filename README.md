# Auto-Youtube

A Chrome extension that plays every YouTube video at the quality you choose, with an option to pause new videos automatically.

## Features

- **Fixed playback quality:** pick 144p up to 8K, or Auto to leave it to YouTube. It applies to every video, including ones you open from inside YouTube without a full page reload, and embedded players.
- **Smart fallback:** if a video doesn't offer your quality, it plays the closest one below it. For example, 1080p chosen on a 720p video plays 720p. If the video has nothing that low, it plays the video's lowest quality.
- **Autopause:** optionally pauses each new video as soon as it starts.
- **Light / dark popup:** follows your system theme until you flip the switch in the header. Your choice is remembered.

## Install

1. Download or clone this repo.
2. Open `chrome://extensions` and turn on **Developer mode** (top right).
3. Click **Load unpacked** and select the project folder.
4. Pin the extension from the puzzle-piece menu so its icon shows in the toolbar.

After pulling changes, click **reload ↻** on the extension's card in `chrome://extensions`.

## Usage

Click the toolbar icon and set **Quality** and **Autopause new videos**. Changes save instantly and apply to open YouTube tabs right away; no reload needed. The default is 1080p with autopause off.

## Notes

- It relies on YouTube's internal player methods. If YouTube renames them, quality selection stops working (playback is unaffected) until `main.js` is updated.
- The icon is YouTube's logo, which is fine for personal use. The Chrome Web Store would likely reject it on trademark grounds, so replace it before publishing.
