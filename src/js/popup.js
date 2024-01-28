import { Popup } from './lib/popup.js';
import { DATA_KEYS } from './constants.js';
import { storage } from './conditionApi.js';

function getData(context) {
    storage
        .get(DATA_KEYS)
        .then(context.handleGetData.bind(context))
        .catch(context.handleError.bind(context));
}

function setData(context) {
    storage
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
