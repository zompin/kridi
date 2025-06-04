import { describe, expect, test } from '@jest/globals';
import * as constants from '../src/js/constants.js';

describe('constants', () => {
    test('should export all required constants and elements', () => {
        // Проверка экспорта констант
        expect(constants.PROXY_HOST).toBe('PROXY_HOST');
        expect(constants.PROXY_PORT).toBe('PROXY_PORT');
        expect(constants.LOGIN).toBe('LOGIN');
        expect(constants.PASSWORD).toBe('PASSWORD');
        expect(constants.MODE).toBe('MODE');

        // Проверка массива ELEMENTS
        const expectedElements = [
            { key: 'PROXY_HOST', elementId: 'proxyHost' },
            { key: 'PROXY_PORT', elementId: 'proxyPort' },
            { key: 'PATTERNS', elementId: 'patterns' },
            { key: 'LOGIN', elementId: 'login', hide: true },
            { key: 'PASSWORD', elementId: 'password', hide: true },
            { key: 'MODE', name: 'mode' }
        ];
        
        expect(constants.ELEMENTS).toEqual(expectedElements);
    });
    
    test('should generate DATA_KEYS from ELEMENTS keys', () => {
        const expectedKeys = ['PROXY_HOST', 'PROXY_PORT', 'PATTERNS', 'LOGIN', 'PASSWORD', 'MODE'];
        expect(constants.DATA_KEYS).toEqual(expect.arrayContaining(expectedKeys));
    });

    test('should have MODES object with expected values', () => {
        const expectedModes = { FOR_SITES: 'for-sites', NOT_FOR_SITES: 'not-for-sites', FOR_ALL: 'for-all' };
        expect(constants.MODES).toEqual(expectedModes);
    });
});