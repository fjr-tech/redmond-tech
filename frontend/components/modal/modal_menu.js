class ModalMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/modal_menu.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;

        this.addEventListener('close-menu', (event) => {
            this.remove();
        });
    }
}
customElements.define('modal-menu', ModalMenu);

// Menu controls (container)
class MenuControls extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/menu_controls.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;
    }
}
customElements.define('menu-controls', MenuControls);

// Menu controller
class MenuController extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/menu_controller.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;
    }
}
customElements.define('menu-controller', MenuController);

// Menu controller (close menu button)
class Controller_CloseMenu extends MenuController {
    constructor() {
        super();
    }

    async connectedCallback() {
        await super.connectedCallback();

        this.shadowRoot.host.textContent = 'x';

        this.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('close-menu', {
                bubbles: true, // allows the event to move up the dom
                composed: true // allows the event to move up the dom, outside any shadow dom layers
            }));
        });
    }
}
customElements.define('close-menu', Controller_CloseMenu);

// Menu header (container)
class MenuHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/menu_header.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;
    }
}
customElements.define('menu-header', MenuHeader);

// Menu body (container)
class MenuBody extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/menu_body.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;
    }
}
customElements.define('menu-body', MenuBody);

// Menu title
class MenuTitle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/menu_title.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;
    }
}
customElements.define('menu-title', MenuTitle);

// Menu text
class MenuText extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/menu_text.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;
    }
}
customElements.define('menu-text', MenuText);

// Menu button
class MenuButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/menu_button.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;
    }
}
customElements.define('menu-button', MenuButton);