import { describe, expect, test } from '@jest/globals';
import { Proxy } from '../src/js/lib/proxy.js';

const proxy = new Proxy();

describe('Proxy', () => {
    test('Smoke', () => {
        expect(proxy.proxy).toEqual({ type: 'direct' });
        expect(proxy.patterns).toEqual([]);
        expect(proxy.credentials).toEqual({ cancel: true });
        expect(proxy.errors).toEqual([]);
    });

    test('Set data', () => {
        proxy.setData({
            PROXY_HOST: 'test_proxy_host',
            PROXY_PORT: 'test_proxy_port',
            LOGIN: btoa('test_login'),
            PASSWORD: btoa('test_password'),
            PATTERNS: 'test_pattern_1\ntest_pattern_2',
        });

        expect(proxy.proxy).toEqual({
            host: 'test_proxy_host',
            port: 'test_proxy_port',
            type: 'http',
        });

        expect(proxy.credentials).toEqual({
            authCredentials: {
                username: 'test_login',
                password: 'test_password',
            },
        });

        expect(proxy.patterns).toEqual([
            new RegExp(/test_pattern_1/i),
            new RegExp(/test_pattern_2/i),
        ]);
    });

    test('On storage change', () => {
        proxy.handleStorageChange({
            PROXY_HOST: { newValue: 'one' },
            PROXY_PORT: { newValue: 'two' },
            LOGIN: { newValue: btoa('three') },
            PASSWORD: { newValue: btoa('four') },
            PATTERNS: { newValue: 'five' },
        });

        expect(proxy.proxy).toEqual({
            host: 'one',
            port: 'two',
            type: 'http',
        });
        expect(proxy.credentials).toEqual({
            authCredentials: {
                username: 'three',
                password: 'four',
            },
        });
        expect(proxy.patterns).toEqual([new RegExp(/five/i)]);
    });

    test('handleProxyRequest matches pattern', () => {
        expect(proxy.handleProxyRequest({ url: 'five.com' })).toEqual({
            host: 'one',
            port: 'two',
            type: 'http',
        });
    });

    test('handleProxyRequest does not match pattern', () => {
        expect(proxy.handleProxyRequest({ url: 'tratata.com' })).toEqual({
            type: 'direct',
        });
    });

    test('handleAuthRequired auth is cancelled', () => {
        expect(proxy.handleAuthRequired({ proxyInfo: {} })).toEqual({
            cancel: true,
        });
    });

    test('handleAuthRequired auth is success', () => {
        expect(
            proxy.handleAuthRequired({
                proxyInfo: {
                    host: 'one',
                    port: 'two',
                    type: 'http',
                },
            }),
        ).toEqual({ authCredentials: { password: 'four', username: 'three' } });
    });

    test('Save and get errors', async () => {
        proxy.handleError(new Error('Test error message'));
        expect(await proxy.getErrors()).toEqual(['Test error message']);
    });
});
