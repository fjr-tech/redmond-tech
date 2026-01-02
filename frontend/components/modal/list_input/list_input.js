// List input
export class ListInput extends HTMLElement {
    #elements = []; // should be an array of strings
    #maxStringLen = 64;

    #isValidStringExternal = () => {
        return true;
    }

    #isValidStringExternalAsync = async () => {
        return true;
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/list_input/list_input.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;

        // initialise #elements        
        const list_elements = this.shadowRoot.host.querySelectorAll('list-element');

        for (let i = list_elements.length - 1; i >= 0; i--) {
            const list_element = list_elements[i];
            let element_text = list_element.innerText;

            // ENFORCES MAX STRING LENGTH
            // DOES NOT ENFORCE STRING VALIDITY FOR SLOTTED STRINGS
            if (element_text.length > this.#maxStringLen) {
                element_text = element_text.slice(0, this.#maxStringLen);
                list_elements[i].innerText = element_text;
            }

            this.#elements.unshift(element_text);
        }

        // slot is visible to this.shadowRoot but not this.shadowRoot.host
        // slotted elements are projected to the shadow dom, and slot is removed
        this.shadowRoot.querySelector('slot').hidden = false;


        // Connect isValidString to src
        const verificationScriptSrc = this.shadowRoot.host.getAttribute('verify-str-src');
        if (verificationScriptSrc) {
            try {
                const module = await import(verificationScriptSrc);
                if (typeof module.isValidString !== 'function') throw new Error('Missing isValidString function.');

                if (module.isValidString.constructor.name === "AsyncFunction") {
                    this.#isValidStringExternalAsync = module.isValidString;
                } else {
                    this.#isValidStringExternal = module.isValidString;
                }

            } catch (err) {
                console.error('Module failed to load:', err);
            }
        }
    }

    async isValidString(string) {
        if (typeof string !== 'string') return false;

        if (string.length > this.#maxStringLen) return false;

        if (!this.#isValidStringExternal(string) || !await this.#isValidStringExternalAsync(string)) return false;

        return true;
    }

    getNewElement(text) {
        const list_element = document.createElement('list-element');
        list_element.innerText = text;

        return list_element;
    }

    getElements() {
        return this.#elements;
    }

    getElementIndex(element) {
        const allElements = Array.from(this.shadowRoot.host.querySelectorAll('list-element'));
        return allElements.indexOf(element);
    }

    async prependElement(text) {
        if (!await this.isValidString(text)) return;

        this.#elements.unshift(text);
        this.shadowRoot.host.prepend(this.getNewElement(text));
    }

    async addElement(index, text) {
        if (!await this.isValidString(text)) return;
        if (index < 0 || index >= this.#elements.length) return;

        if (index === this.#elements.length - 1) return this.appendElement(text);
        if (index === 0) return this.prependElement(text);

        // insert at index, remove 0, insert element
        this.#elements.splice(index, 0, text);

        this.shadowRoot.host.insertBefore(this.getNewElement(text), this.shadowRoot.host.querySelectorAll('list-element')[index]);
    }

    async appendElement(text) {
        if (!await this.isValidString(text)) return;

        this.#elements.push(text);

        this.shadowRoot.host.insertBefore(this.getNewElement(text), this.shadowRoot.host.querySelector('list-add-element'));
    }

    async removeElement(element) {
        const index = this.getElementIndex(element);
        if (index == null || index < 0 || index >= this.#elements.length) return;

        this.#elements.splice(index, 1);
        element.remove();
    }
}
customElements.define('list-input', ListInput);