import { Popup } from './lib/popup.js';
import { storage } from './conditionApi.js';

new Popup({
    permissions: browser.permissions,
    storage,
    document,
    browser,
});

// browser.runtime.sendMessage({}).then((data) => {
//     const res = data.reduce((acc, e) => {
//         acc += `<div>${e}</div>`;
//         return acc;
//     }, '');
//
//     if (res) {
//         errorsEl.innerHTML = res;
//     }
// });
