// List element
export class ListElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/list_element/list_element.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;

        // Get text
        const slot = this.shadowRoot.querySelector('slot');
        const text = slot.assignedNodes({flatten: true}).filter(n => n.nodeType === Node.TEXT_NODE).map(n => n.textContent.trim()).join('');
        
        const text_input = this.shadowRoot.querySelector('.text_input');
        text_input.value = text;


        this.shadowRoot.querySelector('#del').addEventListener('click', async (event) => {
            const listElement = this.shadowRoot.host;
            await this.shadowRoot.host.closest('list-input').removeElement(listElement);
        });
    }
}
customElements.define('list-element', ListElement);