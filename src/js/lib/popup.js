import { DATA_KEYS, ELEMENTS } from '../constants.js';

export class Popup {
    constructor({ document, storage, permissions }) {
        this.document = document;
        this.storage = storage;
        this.permissions = permissions;
        this.subscribeEvents();
        this.checkGrants();
        this.loadData();
        this.resultTimer = 0;
    }

    set data(data) {
        ELEMENTS.forEach((item) => {
            const el = this.document.getElementById(item.elementId);
            el.value = item.hide
                ? atob(data[item.key] || '')
                : data[item.key] || '';
        });
    }

    get data() {
        return ELEMENTS.reduce((acc, item) => {
            const el = this.document.getElementById(item.elementId);
            const value = item.hide ? btoa(el.value) : el.value;

            return { ...acc, [item.key]: value };
        }, {});
    }

    handleError(e) {
        console.log(e);
    }

    loadData() {
        this.storage
            .get(DATA_KEYS)
            .then((d) => {
                this.data = d;
            })
            .catch(this.handleError.bind(this));
    }

    handleBlur() {
        this.storage.set(this.data).then(() => {
            const resEl = this.document.querySelector('.result');

            if (this.resultTimer) {
                clearTimeout(this.resultTimer);
            }

            resEl.classList.add('show');
            this.resultTimer = setTimeout(() => {
                resEl.classList.remove('show');
            }, 2000);
        });
    }

    setGrants(isGranted) {
        this.document.querySelector('.grants').style.display = isGranted
            ? 'none'
            : 'block';
        this.document.querySelector('.controls').style.display = isGranted
            ? 'block'
            : 'none';
    }

    checkGrants() {
        this.permissions
            .contains({ origins: ['<all_urls>'] })
            .then(this.setGrants.bind(this));
    }

    requestGrants() {
        this.permissions
            .request({ origins: ['<all_urls>'] })
            .then(this.setGrants.bind(this));
    }

    subscribeEvents() {
        this.document
            .querySelector('.request-grants')
            .addEventListener('click', this.requestGrants.bind(this));
        this.document
            .querySelectorAll('input, textarea')
            .forEach((el) =>
                el.addEventListener('blur', this.handleBlur.bind(this)),
            );
    }
}
