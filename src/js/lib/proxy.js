import {
    ELEMENTS,
    LOGIN,
    PASSWORD,
    PATTERNS,
    PROXY_HOST,
    PROXY_PORT,
    MODE,
    MODES,
} from '../constants.js';

export class Proxy {
    static Direct = { type: 'direct' };
    static Cancel = { type: 'cancel' };
    constructor() {
        this.proxy = Proxy.Direct;
        this.patterns = [];
        this.errors = [];
        this.mode = MODES.FOR_SITES;
    }

    setData(data) {
        this.proxy = {
            type: 'socks',
            proxyDNS: true,
            host: data[PROXY_HOST],
            port: data[PROXY_PORT],
            username: atob(data[LOGIN]),
            password: atob(data[PASSWORD]),
        };

        this.patterns = (data[PATTERNS] || '')
            .split('\n')
            .filter(Boolean)
            .map((p) => {
                try {
                    return new RegExp(p, 'i');
                } catch (e) {}
            })
            .filter(Boolean);

        this.mode =
            Object.values(MODES).find((m) => m === data[MODE]) || this.mode;
    }

    handleStorageChange(e) {
        const data = ELEMENTS.reduce(
            (acc, { key }) => ({
                ...acc,
                [key]: e[key].newValue,
            }),
            {},
        );

        this.setData(data);
    }

    handleProxyRequest(requestInfo) {
        if (['other'].includes(requestInfo.type)) {
            return Proxy.Cancel;
        }

        if (this.mode === MODES.FOR_ALL) {
            return this.proxy;
        }

        for (let pattern of this.patterns) {
            const hasPattern =
                pattern.test(requestInfo.url) ||
                pattern.test(requestInfo.documentUrl) ||
                pattern.test(requestInfo.originUrl);

            if (this.mode === MODES.FOR_SITES && hasPattern) {
                return this.proxy;
            }

            if (this.mode === MODES.NOT_FOR_SITES && !hasPattern) {
                return this.proxy;
            }
        }

        return Proxy.Direct;
    }

    handleError(e) {
        this.errors.push(e.message);
    }

    async getErrors() {
        return this.errors;
    }
}
