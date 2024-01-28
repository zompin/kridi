export const storage =
    browser.runtime.PlatformOs === 'android'
        ? browser.storage.sync
        : browser.storage.local;
