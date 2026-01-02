// List element
export class ListAddElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    getTextFromSlot() {
        const slot = this.shadowRoot.querySelector('slot');
        const text = slot.assignedNodes({flatten: true}).filter(n => n.nodeType === Node.TEXT_NODE).map(n => n.textContent.trim()).join('');

        return text;
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/list_add_element/list_add_element.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;

        // Get text from slot
        const text = this.getTextFromSlot();
        
        const text_input = this.shadowRoot.querySelector('.text_input');
        text_input.placeholder = text;

        this.shadowRoot.querySelector('#add').addEventListener('click', async (event) => {
            // Add element
            const newElementText = this.shadowRoot.querySelector('.text_input').value;
            const newElement = await this.shadowRoot.host.closest('list-input').appendElement(newElementText);

            // Scroll to bottom of body
            setTimeout(() => {
                // this.shadowRoot.host.closest('menu-body').scrollToEnd();
                newElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 50);
        
        });
    }
}
customElements.define('list-add-element', ListAddElement);