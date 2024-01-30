import { Proxy } from './lib/proxy.js';
import { DATA_KEYS } from './constants.js';
import { storage } from './conditionApi.js';

const proxy = new Proxy();

storage
    .get(DATA_KEYS)
    .then(proxy.setData.bind(proxy))
    .catch(proxy.handleError.bind(proxy));

browser.storage.onChanged.addListener(proxy.handleStorageChange.bind(proxy));

browser.proxy.onRequest.addListener(proxy.handleProxyRequest.bind(proxy), {
    urls: ['<all_urls>'],
});

browser.proxy.onError.addListener(proxy.handleError.bind(proxy));

browser.runtime.onMessage.addListener(proxy.getErrors.bind(proxy));

browser.webRequest.onAuthRequired.addListener(
    proxy.handleAuthRequired.bind(proxy),
    { urls: ['<all_urls>'] },
);
