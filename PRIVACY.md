# Privacy Policy

**Last updated: January 15, 2026**

## Overview

Default Account+ for Google ("the Extension") is committed to protecting your privacy. This privacy policy explains how the Extension handles your data.

## Data Collection

**The Extension does not collect, store, or transmit any personal data.**

## What the Extension Does

The Extension stores only your preferences locally in your browser:
- Your default Google account selection
- Per-service account preferences (e.g., which account to use for Gmail vs Drive)

This data is stored using Chrome's built-in `chrome.storage.sync` API and is:
- Stored locally on your device
- Synced only to your own Chrome profile (if you have Chrome sync enabled)
- Never transmitted to any external servers
- Never shared with third parties

## Permissions Explained

- **tabs**: Used to detect which Google service you're visiting
- **storage**: Used to save your account preferences locally
- **declarativeNetRequest**: Used to redirect URLs to your preferred account
- **host_permissions (*.google.com)**: Required to apply your preferences on Google services

## Third-Party Services

The Extension does not integrate with any third-party analytics, advertising, or tracking services.

## Changes to This Policy

Any changes to this privacy policy will be posted in the Extension's GitHub repository.

## Contact

If you have questions about this privacy policy, please open an issue at:
https://github.com/badrisnarayanan/default.wtf/issues

## Open Source

This Extension is open source. You can review the complete source code at:
https://github.com/badrisnarayanan/default.wtf
