import { describe, expect, test } from '@jest/globals';
import { Proxy } from '../src/js/lib/proxy.js';

const proxy = new Proxy();

describe('Proxy', () => {
    test('Smoke', () => {
        expect(proxy.proxy).toEqual({ type: 'direct' });
        expect(proxy.patterns).toEqual([]);
        expect(proxy.errors).toEqual([]);
    });

    test('Set data', () => {
        proxy.setData({
            PROXY_HOST: 'test_proxy_host',
            PROXY_PORT: 'test_proxy_port',
            LOGIN: 'test_login',
            PASSWORD: 'test_password',
            PATTERNS: 'test_pattern_1\ntest_pattern_2',
        });

        expect(proxy.proxy).toEqual({
            host: 'test_proxy_host',
            port: 'test_proxy_port',
            username: 'test_login',
            password: 'test_password',
            type: 'http',
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
            LOGIN: { newValue: 'three' },
            PASSWORD: { newValue: 'four' },
            PATTERNS: { newValue: 'five' },
        });

        expect(proxy.proxy).toEqual({
            host: 'one',
            port: 'two',
            username: 'three',
            password: 'four',
            type: 'http',
        });
        expect(proxy.patterns).toEqual([new RegExp(/five/i)]);
    });

    test('handleProxyRequest matches pattern', () => {
        expect(proxy.handleProxyRequest({ url: 'five.com' })).toEqual({
            host: 'one',
            port: 'two',
            username: 'three',
            password: 'four',
            type: 'http',
        });
    });

    test('handleProxyRequest does not match pattern', () => {
        expect(proxy.handleProxyRequest({ url: 'tratata.com' })).toEqual({
            type: 'direct',
        });
    });

    test('Save and get errors', async () => {
        proxy.handleError(new Error('Test error message'));
        expect(await proxy.getErrors()).toEqual(['Test error message']);
    });
});
