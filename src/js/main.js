import { Proxy } from './lib/proxy.js';
import { DATA_KEYS } from './constants.js';

const proxy = new Proxy();

browser.storage.sync
    .get(DATA_KEYS)
    .then(proxy.setData.bind(proxy))
    .catch(proxy.handleError.bind(proxy));

browser.storage.onChanged.addListener(proxy.handleStorageChange.bind(proxy));

browser.proxy.onRequest.addListener(proxy.handleProxyRequest.bind(proxy), {
    urls: ['<all_urls>'],
});

browser.proxy.onError.addListener(proxy.handleError.bind(proxy));

browser.runtime.onMessage.addListener(proxy.getErrors.bind(proxy));
