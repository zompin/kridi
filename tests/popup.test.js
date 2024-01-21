import { describe, expect, test, jest as jestForMock } from '@jest/globals';
import { Popup } from '../src/js/lib/popup.js';

const elements = {
    result: {},
    proxyHost: {},
    proxyPort: {},
    patterns: {},
    login: {},
    password: {},
};

const args = {
    getData() {},
    setData() {},
    elements,
    document: {
        getElementById(id) {
            return elements[id];
        },
        addEventListener(ev, handler) {},
    },
};

describe('Popup', () => {
    test('Smoke', () => {
        const spyGetData = jestForMock.spyOn(args, 'getData');
        const popup = new Popup(args);

        expect(popup.document).toBe(args.document);
        expect(popup.resultElement).toBe(args.elements.result);
        expect(spyGetData).toHaveBeenCalled();
    });

    test('handleGetData', () => {
        const popup = new Popup(args);

        popup.handleGetData({
            PROXY_HOST: 'proxy',
            PROXY_PORT: 'port',
            PATTERNS: 'pattern',
            LOGIN: 'bG9naW4',
            PASSWORD: 'cGFzc3dvcmQ',
        });

        expect(elements).toEqual({
            login: { value: 'login' },
            password: { value: 'password' },
            patterns: { value: 'pattern' },
            proxyHost: { value: 'proxy' },
            proxyPort: { value: 'port' },
            result: {},
        });
    });
});
