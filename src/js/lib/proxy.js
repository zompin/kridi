import {
    ELEMENTS,
    LOGIN,
    PASSWORD,
    PATTERNS,
    PROXY_HOST,
    PROXY_PORT,
} from '../constants.js';

export class Proxy {
    static Direct = { type: 'direct' };
    constructor() {
        this.proxy = Proxy.Direct;
        this.patterns = [];
        this.errors = [];
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
            .map((p) => (p === '*' ? p : new RegExp(p, 'i')));
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
        for (let pattern of this.patterns) {
            if (
                pattern === '*' ||
                pattern.test(requestInfo.url) ||
                pattern.test(requestInfo.documentUrl) ||
                pattern.test(requestInfo.originUrl)
            ) {
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
