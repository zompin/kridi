export const PROXY_HOST = 'PROXY_HOST';
export const PROXY_PORT = 'PROXY_PORT';
export const PATTERNS = 'PATTERNS';
export const LOGIN = 'LOGIN';
export const PASSWORD = 'PASSWORD';

export const DATA_KEYS = [PROXY_HOST, PROXY_PORT, PATTERNS, LOGIN, PASSWORD];

export const ELEMENTS = [
    {
        key: PROXY_HOST,
        elementId: 'proxyHost',
    },
    {
        key: PROXY_PORT,
        elementId: 'proxyPort',
    },
    {
        key: PATTERNS,
        elementId: 'patterns',
    },
    {
        key: LOGIN,
        elementId: 'login',
        hide: true,
    },
    {
        key: PASSWORD,
        elementId: 'password',
        hide: true,
    },
];
