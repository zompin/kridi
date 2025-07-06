export const FIELDS = {
    PROXY_HOST: 'PROXY_HOST',
    PROXY_PORT: 'PROXY_PORT',
    PATTERNS: 'PATTERNS',
    LOGIN: 'LOGIN',
    PASSWORD: 'PASSWORD',
    MODE: 'MODE',
};

export const ELEMENTS = [
    {
        key: FIELDS.PROXY_HOST,
        elementId: 'proxyHost',
    },
    {
        key: FIELDS.PROXY_PORT,
        elementId: 'proxyPort',
    },
    {
        key: FIELDS.PATTERNS,
        elementId: 'patterns',
    },
    {
        key: FIELDS.LOGIN,
        elementId: 'login',
        hide: true,
    },
    {
        key: FIELDS.PASSWORD,
        elementId: 'password',
        hide: true,
    },
    {
        key: FIELDS.MODE,
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
