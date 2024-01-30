import { ELEMENTS } from '../constants.js';

export class Popup {
    constructor({ getData, setData, document }) {
        this.document = document;
        this.resultElement = this.document.getElementById('result');
        this.setData = setData;
        getData(this);
        this.document.addEventListener('keyup', this.handleKeyUp.bind(this));
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

    handleGetData(d) {
        this.data = d;
    }

    handleError(e) {
        this.resultElement.innerHTML = `Error: ${e.message}`;
    }

    handleDataSuccess() {
        this.resultElement.innerHTML = 'Success saved';
    }

    handleKeyUp(e) {
        if (!['INPUT', 'TEXTAREA'].includes(e.target.nodeName)) {
            return;
        }
        this.setData(this);
    }
}
