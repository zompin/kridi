import { Proxy } from './lib/proxy.js';
import { DATA_KEYS } from './constants.js';
import { storage } from './conditionApi.js';

const proxy = new Proxy();

storage
    .get(DATA_KEYS)
    .then(proxy.setData.bind(proxy))
    .catch(proxy.handleError.bind(proxy));

browser.storage.onChanged.addListener(proxy.handleStorageChange.bind(proxy));

// browser.permissions
//     .contains({
//         origins: ['<all_urls>'],
//         // permissions: ['host_permissions'],
//         // host_permissions: ['<all_urls>'],
//     })
//     .then((res) => {
//         if (!res) {
//             return browser.permissions.request({
//                 origins: ['<all_urls>'],
//             });
//         }
//     });

browser.proxy.onRequest.addListener(proxy.handleProxyRequest.bind(proxy), {
    urls: ['<all_urls>'],
});

browser.proxy.onError.addListener(proxy.handleError.bind(proxy));

browser.runtime.onMessage.addListener(proxy.getErrors.bind(proxy));
