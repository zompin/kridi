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
    static CancelAuth = { cancel: true };
    constructor() {
        this.proxy = Proxy.Direct;
        this.patterns = [];
        this.credentials = Proxy.CancelAuth;
        this.errors = [];
    }

    setData(data) {
        this.proxy = {
            type: 'http',
            host: data[PROXY_HOST],
            port: data[PROXY_PORT],
        };

        this.credentials = {
            authCredentials: {
                username: atob(data[LOGIN] || ''),
                password: atob(data[PASSWORD] || ''),
            },
        };

        this.patterns = (data[PATTERNS] || '')
            .split('\n')
            .filter(Boolean)
            .map((p) => new RegExp(p, 'i'));
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
            if (pattern.test(requestInfo.url)) {
                return this.proxy;
            }
        }

        return Proxy.Direct;
    }

    handleAuthRequired({ proxyInfo }) {
        if (
            this.proxy.host !== proxyInfo.host ||
            this.proxy.port !== String(proxyInfo.port) ||
            this.proxy.type !== proxyInfo.type
        ) {
            return Proxy.CancelAuth;
        }

        return this.credentials;
    }

    handleError(e) {
        this.errors.push(e.message);
    }

    async getErrors() {
        return this.errors;
    }
}
