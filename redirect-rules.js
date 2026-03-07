// Shared redirect rule logic used by both service-worker.js and tests

// Services that redirect ?authuser=N to /u/N/ format (need allow rules to prevent loops)
export const SERVICES_WITH_PATH_REDIRECT = [
  'gemini.google.com',
  'aistudio.google.com',
  'docs.google.com',
  'drive.google.com',
  'calendar.google.com',
  'contacts.google.com',
  'keep.google.com',
  'photos.google.com',
  'chat.google.com',
  'meet.google.com',
  'mail.google.com'
];

// All Google country-code domains used in excludedInitiatorDomains
export const EXCLUDED_INITIATOR_DOMAINS = [
  'google.com',
  'google.co.uk', 'google.co.in', 'google.co.jp', 'google.co.kr',
  'google.co.za', 'google.co.th', 'google.co.id', 'google.co.nz',
  'google.co.il', 'google.co.ke', 'google.co.tz', 'google.co.ug',
  'google.co.cr', 'google.co.ve', 'google.co.ma', 'google.co.zm',
  'google.co.zw', 'google.co.ao', 'google.co.bw', 'google.co.mz',
  'google.co.vi', 'google.co.ls', 'google.co.uz',
  'google.com.au', 'google.com.br', 'google.com.mx', 'google.com.ar',
  'google.com.sg', 'google.com.hk', 'google.com.tw', 'google.com.ng',
  'google.com.ph', 'google.com.eg', 'google.com.pk', 'google.com.co',
  'google.com.my', 'google.com.tr', 'google.com.ua', 'google.com.pe',
  'google.com.bd', 'google.com.vn', 'google.com.sa', 'google.com.ec',
  'google.com.do', 'google.com.gt', 'google.com.uy', 'google.com.py',
  'google.com.bo', 'google.com.pr', 'google.com.cu', 'google.com.ni',
  'google.com.sv', 'google.com.pa', 'google.com.gh', 'google.com.np',
  'google.com.kh', 'google.com.jm', 'google.com.cy', 'google.com.ly',
  'google.com.qa', 'google.com.om', 'google.com.kw', 'google.com.bh',
  'google.com.lb', 'google.com.mt', 'google.com.gi', 'google.com.af',
  'google.com.et', 'google.com.fj', 'google.com.mm', 'google.com.bn',
  'google.com.na', 'google.com.pg', 'google.com.ag', 'google.com.ai',
  'google.com.bz', 'google.com.sl', 'google.com.vc', 'google.com.tj',
  'google.fr', 'google.de', 'google.es', 'google.it', 'google.ca',
  'google.nl', 'google.pl', 'google.se', 'google.no', 'google.dk',
  'google.fi', 'google.at', 'google.ch', 'google.be', 'google.pt',
  'google.gr', 'google.cz', 'google.ro', 'google.hu', 'google.ie',
  'google.ru', 'google.cl', 'google.sk', 'google.bg', 'google.hr',
  'google.lt', 'google.lv', 'google.ee', 'google.si', 'google.lu',
  'google.is', 'google.li', 'google.md', 'google.rs', 'google.ba',
  'google.me', 'google.mk', 'google.al', 'google.az', 'google.ge',
  'google.am', 'google.kz', 'google.kg', 'google.mn', 'google.lk',
  'google.ae', 'google.jo', 'google.iq', 'google.ps', 'google.tn',
  'google.dz', 'google.sn', 'google.cm', 'google.ci', 'google.mg',
  'google.cd', 'google.rw', 'google.bi', 'google.dj', 'google.ht',
  'google.tt', 'google.bs', 'google.mu', 'google.sc', 'google.gl',
  'google.gg', 'google.je', 'google.im', 'google.sh', 'google.ms',
  'google.dm', 'google.gp', 'google.vu', 'google.fm', 'google.nr',
  'google.ki', 'google.pn', 'google.ne', 'google.ml', 'google.bf',
  'google.td', 'google.tg', 'google.gm', 'google.mw', 'google.cv',
  'google.sm', 'google.ad', 'google.as', 'google.cat', 'google.nu',
  'google.tk', 'google.ws', 'google.to', 'google.la', 'google.mv',
  'google.tl', 'google.cf', 'google.gy', 'google.by', 'google.tm',
  'google.ga'
];

// Full list of supported Google services
export function allSupportedGoogleServices() {
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
    { name: 'Collab', title: 'Colab Research', url: 'colab.research.google.com', img: './images/logos/collab.png' },
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
    { name: 'Gemini', title: 'Gemini', url: 'gemini.google.com', img: './images/logos/gemini.png' },
    { name: 'NotebookLM', title: 'NotebookLM', url: 'notebooklm.google.com', img: './images/logos/notebooklm.png' },
    { name: 'AIStudio', title: 'AI Studio', url: 'aistudio.google.com', img: './images/logos/aistudio.png' },
  ];
}

// Build declarativeNetRequest rules from config
// Returns an array of rule objects ready for chrome.declarativeNetRequest.updateDynamicRules
export function buildRedirectRules({ defaultAccount, customRules = [], accounts, ruleIdBase = 1000 }) {
  const services = allSupportedGoogleServices();
  const rules = [];
  let ruleId = ruleIdBase;

  const isAccountLoggedIn = (idx) => Boolean(accounts[idx]?.isLoggedIn);

  const getAccountIdForService = (service) => {
    const custom = customRules.find(r =>
      r.serviceName.toLowerCase() === service.name.toLowerCase() ||
      r.serviceUrl === service.url
    );
    return custom ? custom.accountId : defaultAccount;
  };

  // Gmail.com → redirect to mail.google.com with correct account
  const mailService = services.find(s => s.url === 'mail.google.com');
  if (mailService) {
    const mailAccountId = getAccountIdForService(mailService);
    if (mailAccountId !== 0 && isAccountLoggedIn(mailAccountId)) {
      rules.push({
        id: ruleId++,
        priority: 1,
        action: {
          type: 'redirect',
          redirect: {
            url: `https://mail.google.com/mail/?authuser=${mailAccountId}`
          }
        },
        condition: {
          regexFilter: `^https?://(www\\.)?gmail\\.com.*`,
          resourceTypes: ['main_frame']
        }
      });
    }
  }

  // Path-redirect services (allow /u/N/ URLs, redirect others with ?authuser)
  for (const serviceUrl of SERVICES_WITH_PATH_REDIRECT) {
    const service = services.find(s => s.url === serviceUrl);
    if (!service) continue;

    const accountId = getAccountIdForService(service);
    if (accountId === 0 || !isAccountLoggedIn(accountId)) continue;

    const escapedUrl = serviceUrl.replace(/\./g, '\\.');

    // Priority 2 - Allow: URL already has /u/N/, respect user's manual account choice
    rules.push({
      id: ruleId++,
      priority: 2,
      action: { type: 'allow' },
      condition: {
        regexFilter: `^https?://${escapedUrl}/.*u/\\d+(/|$|\\?).*`,
        resourceTypes: ['main_frame']
      }
    });

    // Priority 1 - Insert: URL has no /u/N/, use ?authuser to let Google handle routing
    rules.push({
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
        regexFilter: `^https?://${escapedUrl}/.*`,
        excludedInitiatorDomains: EXCLUDED_INITIATOR_DOMAINS,
        resourceTypes: ['main_frame']
      }
    });
  }

  // Standard services (authuser only, no path-based redirect)
  for (const service of services) {
    if (SERVICES_WITH_PATH_REDIRECT.includes(service.url)) continue;

    const accountId = getAccountIdForService(service);
    if (accountId === 0 || !isAccountLoggedIn(accountId)) continue;

    const escapedUrl = service.url.replace(/\./g, '\\.');

    rules.push({
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
        regexFilter: `^https?://([^/]*\\.)?${escapedUrl}/.*`,
        excludedInitiatorDomains: EXCLUDED_INITIATOR_DOMAINS,
        resourceTypes: ['main_frame']
      }
    });
  }

  return rules;
}
