// Service Worker for Default Account+ for Google (Manifest V3)

// ============================================================
// Storage Helper Class
// ============================================================
class SyncStorage {
  static store(obj, callback) {
    chrome.storage.sync.set(obj, callback);
  }

  static get(key, callback) {
    chrome.storage.sync.get(key, callback);
  }

  static async getAsync(key) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, resolve);
    });
  }

  static async storeAsync(obj) {
    return new Promise((resolve) => {
      chrome.storage.sync.set(obj, resolve);
    });
  }
}

// ============================================================
// Google Service URL Detection
// ============================================================
// Full list of Google Services subdomains - https://gist.github.com/abuvanth/b9fcbaf7c77c2954f96c6e556138ffe8
function isGoogleServiceUrl(url) {
  return (
    /^https?:\/\/[^?&]*(?:mail|drive|calendar|meet|docs|admin|photos|translate|keep|hangouts|chat|workspace|maps|news|ads|ediscovery|jamboard|earth|podcasts|classroom|business|myaccount|adsense|cloud|adwords|analytics|firebase|play|voice|tagmanager|duo|datastudio|optimize|merchants|finance|colab\.research|contacts|script|messages|search|stadia|developers|one|chrome|books|sites|groups|gemini|notebooklm|lookerstudio|appsheet)\.google\.co.*/i.test(
      url
    ) ||
    // test several services that switched from the pattern "https://maps.google.com" -> https://www.google.com/maps
    /^https?:\/\/(www\.)?google\.co(?:m|\.[a-z]{2,3})\/(?:maps|finance|travel|flights)/i.test(
      url
    )
  );
}

function isAnyGoogleUrl(url) {
  return /^https?:\/\/([^?&]*\.)?google\.co.*/i.test(url);
}

// ============================================================
// URL Conversion
// ============================================================
// converts the "originalUrl" to the redirectUrl
// if defaultAccount is the same as in "?authuser={num}" or "/u/{num}" - returns null (meaning no need for redirect)
function convertToRedirectUrl(originalUrl, defaultAccount) {
  try {
    const url = new URL(originalUrl);
    const params = new URLSearchParams(url.search);
    // check if current user is not the same (?authuser={num} or /u/{num}/)
    if (`${params.get('authuser')}` === `${defaultAccount}`) return null;
    const uMatch = originalUrl.match(/\/u\/(\d+)\/?/i);
    if (uMatch && uMatch[1] && `${uMatch[1]}` === `${defaultAccount}`)
      return null;

    // current user is different, change
    params.delete('authuser');
    params.set('authuser', defaultAccount);
    url.search = params.toString();
    return url.toString();
  } catch {
    return null;
  }
}

function redirectCurrentTab(defaultAccount) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs && tabs[0] && isGoogleServiceUrl(tabs[0].url)) {
      const url = convertToRedirectUrl(tabs[0].url, defaultAccount);
      if (url) {
        chrome.tabs.update(tabs[0].id, { url });
      }
    }
  });
}

// ============================================================
// Supported Google Services List (for Rules UI)
// ============================================================
function allSupportedGoogleServices() {
  return [
    { name: 'Calendar', title: 'Calendar', url: 'calendar.google.com', img: './images/logos/calendar.png' },
    { name: 'Drive', title: 'Drive', url: 'drive.google.com', img: './images/logos/drive.png' },
    { name: 'Maps', title: 'Maps', url: 'maps.google.com', img: './images/logos/maps.png' },
    { name: 'Meet', title: 'Meet', url: 'meet.google.com', img: './images/logos/meet.png' },
    { name: 'Mail', title: 'Mail', url: 'mail.google.com', img: './images/logos/mail.png' },
    { name: 'Docs', title: 'Docs', url: 'docs.google.com', img: './images/logos/docs.png' },
    { name: 'Admin', title: 'Admin', url: 'admin.google.com', img: './images/logos/admin.png' },
    { name: 'Photos', title: 'Photos', url: 'photos.google.com', img: './images/logos/photos.png' },
    { name: 'Translate', title: 'Translate', url: 'translate.google.com', img: './images/logos/translate.png' },
    { name: 'Keep', title: 'Keep', url: 'keep.google.com', img: './images/logos/keep.png' },
    { name: 'Hangouts', title: 'Hangouts', url: 'hangouts.google.com', img: './images/logos/hangouts.png' },
    { name: 'Chat', title: 'Chat', url: 'chat.google.com', img: './images/logos/chat.png' },
    { name: 'Workspace', title: 'Workspace', url: 'workspace.google.com' },
    { name: 'News', title: 'News', url: 'news.google.com', img: './images/logos/news.png' },
    { name: 'Ads', title: 'Ads', url: 'ads.google.com', img: './images/logos/ads.png' },
    { name: 'Ediscovery', title: 'Ediscovery (Vault)', url: 'ediscovery.google.com', img: './images/logos/ediscovery.png' },
    { name: 'Jamboard', title: 'Jamboard', url: 'jamboard.google.com', img: './images/logos/jamboard.png' },
    { name: 'Earth', title: 'Earth', url: 'earth.google.com', img: './images/logos/earth.png' },
    { name: 'Podcasts', title: 'Podcasts', url: 'podcasts.google.com', img: './images/logos/podcasts.png' },
    { name: 'Classroom', title: 'Classroom', url: 'classroom.google.com', img: './images/logos/classroom.png' },
    { name: 'Business', title: 'Business', url: 'business.google.com', img: './images/logos/business.png' },
    { name: 'MyAccount', title: 'MyAccount', url: 'myaccount.google.com' },
    { name: 'Adsense', title: 'Adsense', url: 'adsense.google.com', img: './images/logos/adsense.png' },
    { name: 'Adwords', title: 'Adwords', url: 'adwords.google.com', img: './images/logos/ads.png' },
    { name: 'Cloud', title: 'Cloud Console', url: 'console.cloud.google.com', img: './images/logos/cloud.png' },
    { name: 'Analytics', title: 'Analytics', url: 'analytics.google.com', img: './images/logos/analytics.png' },
    { name: 'Firebase', title: 'Firebase Console', url: 'console.firebase.google.com', img: './images/logos/firebase.png' },
    { name: 'Play', title: 'Google Play', url: 'play.google.com', img: './images/logos/play.png' },
    { name: 'Voice', title: 'Voice', url: 'voice.google.com', img: './images/logos/voice.png' },
    { name: 'TagManager', title: 'Tag Manager', url: 'tagmanager.google.com', img: './images/logos/tagmanager.png' },
    { name: 'Duo', title: 'Duo', url: 'duo.google.com', img: './images/logos/duo.png' },
    { name: 'DataStudio', title: 'Data Studio', url: 'datastudio.google.com', img: './images/logos/datastudio.png' },
    { name: 'Optimize', title: 'Optimize', url: 'optimize.google.com', img: './images/logos/optimize.png' },
    { name: 'Merchants', title: 'Merchant Center', url: 'merchants.google.com', img: './images/logos/merchants.png' },
    { name: 'Finance', title: 'Finance', url: 'finance.google.com', img: './images/logos/finance.png' },
    { name: 'Collab', title: 'Colab Research', url: 'colab.research.google.com', img: './images/logos/colab.png' },
    { name: 'Contacts', title: 'Contacts', url: 'contacts.google.com', img: './images/logos/contacts.png' },
    { name: 'Script', title: 'Apps Script', url: 'script.google.com', img: './images/logos/script.png' },
    { name: 'Messages', title: 'Messages', url: 'messages.google.com', img: './images/logos/messages.png' },
    { name: 'SearchConsole', title: 'Search Console', url: 'search.google.com', img: './images/logos/search.png' },
    { name: 'Stadia', title: 'Stadia', url: 'stadia.google.com', img: './images/logos/stadia.png' },
    { name: 'Developers', title: 'Developers', url: 'developers.google.com', img: './images/logos/developers.png' },
    { name: 'One', title: 'Google One', url: 'one.google.com', img: './images/logos/one.png' },
    { name: 'ChromeWebStore', title: 'Chrome Web Store', url: 'chrome.google.com', img: './images/logos/chrome.png' },
    { name: 'Sites', title: 'Sites', url: 'sites.google.com', img: './images/logos/sites.png' },
    { name: 'Groups', title: 'Groups', url: 'groups.google.com', img: './images/logos/groups.png' },
    // New Google services
    { name: 'Gemini', title: 'Gemini', url: 'gemini.google.com', img: './images/logos/gemini.png' },
    { name: 'NotebookLM', title: 'NotebookLM', url: 'notebooklm.google.com', img: './images/logos/notebooklm.png' },
    { name: 'LookerStudio', title: 'Looker Studio', url: 'lookerstudio.google.com', img: './images/logos/looker.png' },
    { name: 'AppSheet', title: 'AppSheet', url: 'appsheet.google.com', img: './images/logos/appsheet.png' },
  ];
}

// ============================================================
// Offscreen Document Management for Parsing
// ============================================================
let creatingOffscreen = null;

async function ensureOffscreenDocument() {
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [chrome.runtime.getURL('offscreen.html')]
  });

  if (existingContexts.length > 0) {
    return;
  }

  if (creatingOffscreen) {
    await creatingOffscreen;
    return;
  }

  creatingOffscreen = chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['DOM_PARSER'],
    justification: 'Parse Google accounts response which requires DOMParser'
  });

  await creatingOffscreen;
  creatingOffscreen = null;
}

async function parseAccountsWithOffscreen(rawText) {
  await ensureOffscreenDocument();

  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'parse_accounts', rawText }, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      if (response.error) {
        reject(new Error(response.error));
        return;
      }
      resolve(response.result);
    });
  });
}

// ============================================================
// Declarative Net Request Rules Management
// ============================================================
// We use dynamic rules to redirect Google service URLs to include the correct authuser parameter
// This replaces the webRequest.onBeforeRequest blocking listener from MV2

const RULE_ID_BASE = 1000;
const MAX_RULES = 100;

async function updateRedirectRules() {
  const data = await SyncStorage.getAsync(['defaultAccount', 'rules', 'accounts']);
  const defaultAccount = data.defaultAccount ?? 0;
  const customRules = data.rules ?? [];
  const accounts = data.accounts ?? [];

  // If default account is 0, no redirect needed (Google handles it)
  // Also check if account is logged in
  const isAccountLoggedIn = (accountIndex) => {
    return Boolean(accounts[accountIndex]?.isLoggedIn);
  };

  // Get all existing dynamic rules to remove them
  const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
  const existingRuleIds = existingRules.map(rule => rule.id);

  // Build new rules
  const newRules = [];
  let ruleId = RULE_ID_BASE;

  // Get all supported services
  const services = allSupportedGoogleServices();

  for (const service of services) {
    // Check if there's a custom rule for this service
    const customRule = customRules.find(r =>
      r.serviceName.toLowerCase() === service.name.toLowerCase() ||
      r.serviceUrl === service.url
    );

    const accountId = customRule ? customRule.accountId : defaultAccount;

    // Skip if account is 0 (default) or not logged in
    if (accountId === 0 || !isAccountLoggedIn(accountId)) {
      continue;
    }

    // Create rule for this service
    // Use urlFilter to match the service domain
    // Use excludedRequestDomains won't work here, so we rely on urlFilter
    // Note: We can't easily exclude URLs with authuser using urlFilter alone,
    // so we'll handle that check in the tabs.onCreated listener instead
    const escapedUrl = service.url.replace(/\./g, '\\.');
    newRules.push({
      id: ruleId++,
      priority: 1,
      action: {
        type: 'redirect',
        redirect: {
          transform: {
            queryTransform: {
              addOrReplaceParams: [{ key: 'authuser', value: String(accountId) }]
            }
          }
        }
      },
      condition: {
        // Use regexFilter to match URLs without authuser parameter
        regexFilter: `^https?://([^/]*\\.)?${escapedUrl}/.*`,
        excludedInitiatorDomains: ['google.com', 'google.co.uk', 'google.co.in'],
        resourceTypes: ['main_frame']
      }
    });

    if (ruleId >= RULE_ID_BASE + MAX_RULES) break;
  }

  // Update the dynamic rules
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: existingRuleIds,
    addRules: newRules.slice(0, MAX_RULES)
  });

  console.log(`Updated ${newRules.length} redirect rules`);
}

// ============================================================
// Installation and Storage Change Handlers
// ============================================================
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    SyncStorage.get('rules', (data) => {
      if (data.rules === undefined) {
        SyncStorage.store({ rules: [] });
      }
    });
    SyncStorage.get('defaultAccount', (data) => {
      if (data.defaultAccount === undefined) {
        SyncStorage.store({ defaultAccount: 0 });
      }
    });
  }

  // Update rules on install/update
  updateRedirectRules();
});

// Listen for storage changes and update rules accordingly
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === 'sync') {
    if ('defaultAccount' in changes || 'rules' in changes || 'accounts' in changes) {
      updateRedirectRules();
    }
  }
});

// ============================================================
// Message Handling
// ============================================================
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'fetch_google_accounts') {
    const url =
      'https://accounts.google.com/ListAccounts?gpsia=1&source=ogb&mo=1&origin=https://accounts.google.com';

    fetch(url)
      .then((response) => response.text())
      .then(async (rawText) => {
        try {
          // Use offscreen document for parsing
          const result = await parseAccountsWithOffscreen(rawText);
          sendResponse(result);
        } catch (error) {
          console.error('Failed to parse accounts:', error);
          // Fallback: try regex-based parsing
          try {
            const match = rawText.match(/<script>.*?'([^']+)'.*?<\/script>/s);
            if (match && match[1]) {
              const decoded = match[1]
                .replace(/\\x([0-9a-fA-F]{2})/g, (m, p) =>
                  String.fromCharCode(parseInt(p, 16))
                )
                .replace(/\\\//g, '/')
                .replace(/\\n/g, '');
              sendResponse(JSON.parse(decoded));
            } else {
              sendResponse([]);
            }
          } catch {
            sendResponse([]);
          }
        }
      })
      .catch((error) => {
        console.error('Failed to fetch accounts:', error);
        sendResponse([]);
      });

    return true; // Keep the message channel open for async response
  }

  // Handle request for services list
  if (message === 'get_supported_services') {
    sendResponse(allSupportedGoogleServices());
    return;
  }
});

// ============================================================
// Tab Navigation Handler
// ============================================================
// Handle new tabs opened to Google services
chrome.tabs.onCreated.addListener(async (tab) => {
  const url = tab.pendingUrl || tab.url;
  if (!url || !isGoogleServiceUrl(url)) return;

  const data = await SyncStorage.getAsync(['defaultAccount', 'rules', 'accounts']);
  const defaultAccount = data.defaultAccount ?? 0;
  const customRules = data.rules ?? [];
  const accounts = data.accounts ?? [];

  // Check if URL already has authuser
  if (url.toLowerCase().includes('authuser') || /\/u\/\d+/i.test(url)) {
    return;
  }

  // Determine which account to use
  let accountId = defaultAccount;
  for (const rule of customRules) {
    const reg = new RegExp(
      `^https?://[^?&]*${rule.serviceName.toLowerCase()}\\.google\\.co.*`,
      'is'
    );
    if (reg.test(url)) {
      accountId = rule.accountId;
      break;
    }
  }

  // Skip if account 0 or not logged in
  if (accountId === 0 || !accounts[accountId]?.isLoggedIn) {
    return;
  }

  // Check if opened from another Google page
  if (tab.openerTabId) {
    try {
      const openerTab = await chrome.tabs.get(tab.openerTabId);
      if (openerTab && isAnyGoogleUrl(openerTab.url)) {
        return; // Don't redirect if opened from Google
      }
    } catch {
      // Opener tab may not exist
    }
  }

  const redirectUrl = convertToRedirectUrl(url, accountId);
  if (redirectUrl) {
    chrome.tabs.update(tab.id, { url: redirectUrl });
  }
});

// ============================================================
// Keyboard Shortcuts Handler
// ============================================================
chrome.commands.onCommand.addListener((command) => {
  if (command?.indexOf('switch_to_ga_') >= 0) {
    try {
      const accNum = parseInt(command.charAt(command.length - 1)) - 1;
      SyncStorage.get('accounts', (data) => {
        // redirect only if accNum is not > than total number of accounts
        if (data.accounts && data.accounts.length > accNum) {
          redirectCurrentTab(accNum);
        }
      });
    } catch {
      // Ignore errors
    }
  }
});

// ============================================================
// Service Worker Startup
// ============================================================
// Initialize rules when service worker starts
updateRedirectRules();

// Export for popup scripts
self.SyncStorage = SyncStorage;
self.isGoogleServiceUrl = isGoogleServiceUrl;
self.isAnyGoogleUrl = isAnyGoogleUrl;
self.convertToRedirectUrl = convertToRedirectUrl;
self.redirectCurrentTab = redirectCurrentTab;
self.allSupportedGoogleServices = allSupportedGoogleServices;
