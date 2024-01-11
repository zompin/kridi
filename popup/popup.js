import { PROXY_HOST, PROXY_PORT, PATTERNS, LOGIN, PASSWORD } from "../js/constants.js";

const saveEl = document.getElementById('save')
const proxyHostEl = document.getElementById('proxyHost')
const proxyPortEl = document.getElementById('proxyPort')
const patternsEl = document.getElementById('patterns')
const loginEl = document.getElementById('login')
const passwordEl = document.getElementById('password')
const resultEl = document.getElementById('result')
const errorsEl = document.getElementById('errors')

saveEl.addEventListener('click', () => {
    const proxyHostValue = proxyHostEl.value
    const proxyPortValue = proxyPortEl.value
    const patternsValue = patternsEl.value
    const loginValue = loginEl.value
    const passwordValue = passwordEl.value

    browser.storage.sync.set({
        [PROXY_HOST]: proxyHostValue,
        [PROXY_PORT]: proxyPortValue,
        [PATTERNS]: patternsValue,
        [LOGIN]: btoa(loginValue),
        [PASSWORD]: btoa(passwordValue)
    })
        .then(() => {
            resultEl.innerHTML = 'Success saved'
        })
        .catch((e) => resultEl.innerHTML = `Error: ${e.message}`)
})

browser.storage.sync.get([PROXY_HOST, PROXY_PORT, PATTERNS, LOGIN, PASSWORD])
    .then((data) => {
        proxyHostEl.value = data[PROXY_HOST] || ''
        proxyPortEl.value = data[PROXY_PORT] || ''
        patternsEl.value = data[PATTERNS] || ''
        loginEl.value = atob(data[LOGIN] || '')
        passwordEl.value = atob(data[PASSWORD] || '')
    })
    .catch((e) => resultEl.innerHTML = `Error: ${e.message}`)

browser.runtime.sendMessage({}).then(data => {
    const res = data.reduce((acc, e) => {
        acc += `<div>${e}</div>`
        return acc
    }, '')

    if (res) {
        errorsEl.innerHTML = res
    }
})
