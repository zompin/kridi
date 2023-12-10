const PROXY_HOST = 'PROXY_HOST';
const PROXY_PORT = 'PROXY_PORT';
const PATTERNS = 'PATTERNS';
const LOGIN = 'LOGIN';
const PASSWORD = 'PASSWORD';

save.addEventListener('click', () => {
    const proxyHostValue = proxyHost.value
    const proxyPortValue = proxyPort.value
    const patternsValue = patterns.value
    const loginValue = login.value
    const passwordValue = password.value

    browser.storage.sync.set({
        [PROXY_HOST]: proxyHostValue,
        [PROXY_PORT]: proxyPortValue,
        [PATTERNS]: patternsValue,
        [LOGIN]: btoa(loginValue),
        [PASSWORD]: btoa(passwordValue)
    })
        .then(() => {
            result.innerHTML = 'Success saved'
        })
        .catch((e) => result.innerHTML = `Error: ${e.message}`)
})

browser.storage.sync.get([PROXY_HOST, PROXY_PORT, PATTERNS, LOGIN, PASSWORD])
    .then((data) => {
        proxyHost.value = data[PROXY_HOST] || ''
        proxyPort.value = data[PROXY_PORT] || ''
        patterns.value = data[PATTERNS] || ''
        login.value = atob(data[LOGIN] || '')
        password.value = atob(data[PASSWORD] || '')
    })
    .catch((e) => result.innerHTML = `Error: ${e.message}`)

browser.runtime.sendMessage({}).then(data => {
    const res = data.reduce((acc, e) => {
        acc += `<div>${e}</div>`
        return acc
    }, '')

    if (res) {
        errors.innerHTML = res
    }
})
