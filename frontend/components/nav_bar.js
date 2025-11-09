class NavBar extends HTMLElement {
    constructor() {
        super(); // must run super as this constructor is prioritised over the HTMLElement class constructor
    }

    // when element is added to DOM
    async connectedCallback() {
        const response = await fetch('/components/nav_bar.html');
        const html = await response.text(); // use text method for HTML

        // Use shadow DOM to prevetns styling conflicts between this element and the parent DOM
        this.attachShadow({ mode: 'open' }); // mode open makes shadowRoot accessible via element.shadowRoot in JS

        this.shadowRoot.innerHTML = html;
    }

    // when element is removed from DOM
    disconnectedCallback() {

    }
}

customElements.define('page-nav', NavBar);