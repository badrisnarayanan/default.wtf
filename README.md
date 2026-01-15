# Default Account+ for Google

A maintained fork of [default.wtf](https://github.com/uptechteam/default.wtf) updated for **Manifest V3** and modern Chrome versions.

## What's New in v2.0

- **Manifest V3 Support**: Updated for Chrome's latest extension platform
- **New Google Services**: Added support for Gemini, NotebookLM, AppSheet
- **Firefox Support**: Maintains MV2 compatibility for Firefox
- **Service Worker Architecture**: Replaced persistent background page with service worker
- **Declarative Net Request**: Uses modern Chrome API for URL redirects

## Features

- Set a default Google account for all Google services
- Create per-service rules (e.g., use Account #2 for Gmail, Account #1 for Drive)
- Quick account switching with keyboard shortcuts (Alt+1 through Alt+9)
- Supports 50+ Google services

## Installation

### Chrome
1. Download or clone this repository
2. Open `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder

### Firefox
1. Rename `manifest_firefox.json` to `manifest.json` (backup the Chrome one first)
2. Open `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select `manifest.json`

## Supported Google Services

Calendar, Drive, Gmail, Meet, Docs, Photos, Keep, Chat, Maps, News, Ads, Analytics, Firebase, Cloud Console, Play Store, YouTube, Translate, Classroom, and many more including:
- **New**: Gemini, NotebookLM, Looker Studio, AppSheet

## License

BSD-3-Clause License - see [LICENSE](LICENSE)

## Credits

Original extension by [UpTech Team](https://github.com/uptechteam)
