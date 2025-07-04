export const PROXY_HOST = 'PROXY_HOST';
export const PROXY_PORT = 'PROXY_PORT';
export const PATTERNS = 'PATTERNS';
export const LOGIN = 'LOGIN';
export const PASSWORD = 'PASSWORD';
export const MODE = 'MODE';

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
    {
        key: MODE,
        name: 'mode',
    },
];

export const DATA_KEYS = ELEMENTS.map((el) => el.key);

export const MODES = {
    FOR_SITES: 'for-sites',
    NOT_FOR_SITES: 'not-for-sites',
    FOR_ALL: 'for-all',
    DISABLED: 'disabled',
};
