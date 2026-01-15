// Offscreen document for parsing Google accounts response
// DOMParser is not available in service workers, so we use this offscreen document

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'parse_accounts') {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(message.rawText, 'application/xml');
      const scriptElement = doc.querySelector('script');

      if (!scriptElement) {
        sendResponse({ error: 'No script element found' });
        return;
      }

      const html = scriptElement.innerHTML;
      const parsed = html
        .split("'")[1]
        .replace(/\\x([0-9a-fA-F]{2})/g, (match, paren) =>
          String.fromCharCode(parseInt(paren, 16))
        )
        .replace(/\\\//g, '/')
        .replace(/\\n/g, '');

      const result = JSON.parse(parsed);
      sendResponse({ result });
    } catch (error) {
      sendResponse({ error: error.message });
    }
    return true;
  }
});
