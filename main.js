import { PROXY_HOST, PROXY_PORT, PATTERNS, LOGIN, PASSWORD } from "./js/constants.js";

const direct = { type: "direct" }
let proxy = null
let patterns = []
const errors = []

browser.storage.sync.get([PROXY_HOST, PROXY_PORT, PATTERNS, LOGIN, PASSWORD])
    .then(setData)
    .catch((e) => errors.push(e))

function setData(data) {
    proxy = {
        type: 'http',
        host: data[PROXY_HOST],
        port: data[PROXY_PORT],
        username: data[LOGIN],
        password: data[PASSWORD],
    }
    patterns = (data[PATTERNS] || '').split('\n').filter(Boolean).map(p => new RegExp(p, 'i'))
}

function handleChanged(e) {
    setData({
        [PROXY_HOST]: e[PROXY_HOST].newValue,
        [PROXY_PORT]: e[PROXY_PORT].newValue,
        [LOGIN]: e[LOGIN].newValue,
        [PASSWORD]: e[PASSWORD].newValue,
        [PATTERNS]: e[PATTERNS].newValue,
    })
}

function handleProxyRequest(requestInfo) {
    if (!proxy) {
        return direct
    }

    for (let pattern of patterns) {
        if (pattern.test(requestInfo.url)) {
            return proxy
        }
    }

    return direct;
}

browser.storage.onChanged.addListener(handleChanged)

browser.proxy.onRequest.addListener(handleProxyRequest, {
    urls: ["<all_urls>"],
});

browser.proxy.onError.addListener((e) => {
    errors.push(e.message)
})

browser.runtime.onMessage.addListener(async () => {
    return errors
})
