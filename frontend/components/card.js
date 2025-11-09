class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/card.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;

        // On click

        this.addEventListener('click', () => {
            const link = this.getAttribute('link') || null;

            if (link) document.location = link;
        });
    }
}

class CardContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/card_container.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;
    }
}

customElements.define('page-card', Card);
customElements.define('card-container', CardContainer);