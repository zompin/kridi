import { Popup } from './lib/popup.js';
import { DATA_KEYS } from './constants.js';

function getData(context) {
    browser.storage.sync
        .get(DATA_KEYS)
        .then(context.handleGetData.bind(context))
        .catch(context.handleError.bind(context));
}

function setData(context) {
    browser.storage.sync
        .set(context.data)
        .then(context.handleDataSuccess.bind(context))
        .catch(context.handleError.bind(context));
}

new Popup({
    getData,
    setData,
    document,
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
