class DropdownMenu extends HTMLElement {
    constructor() {
        super();

        this.isOpen = false; // menu open/closed
        this.subOpen = false; // sub menu open/closed
        this.attachShadow({ mode: 'open' });
    }
    subMenuOpen() {
        this.shadowRoot.querySelector('')
    }

    getMenuPos() {
        const controller = this.shadowRoot.querySelector('.dropdown_menu_controller');
        const openFrom = this.getAttribute('openFrom');

        switch (openFrom) {
            case 'right':
                return {
                    x: controller.getBoundingClientRect().right,
                    y: controller.getBoundingClientRect().top
                };

            // Default / bottom
            default:
                return {
                    x: controller.getBoundingClientRect().left,
                    y: controller.getBoundingClientRect().bottom
                };
        }
    }

    open() {
        const controller = this.shadowRoot.querySelector('.dropdown_menu_controller');
        const dropdown_menu = this.shadowRoot.querySelector('.dropdown_menu');
        dropdown_menu.style.display = 'flex';

        const {x: menuX, y: menuY} = this.getMenuPos();

        dropdown_menu.style.top = `${menuY}px`;
        dropdown_menu.style.left = `${menuX}px`;


        // Change controller text
        controller.innerText = `▼ ${this.desc}`;

        this.isOpen = true;
    }

    close() {
        const controller = this.shadowRoot.querySelector('.dropdown_menu_controller');
        const dropdown_menu = this.shadowRoot.querySelector('.dropdown_menu');
        dropdown_menu.style.display = 'none';
        controller.innerText = `▶ ${this.desc}`;
        
        this.isOpen = false;
    }

    async connectedCallback() {
        // Set shadow DOM HTML
        const res = await fetch('/components/dropdown/dropdown_menu.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;

        // set text
        const controller = this.shadowRoot.querySelector('.dropdown_menu_controller');

        this.desc = this.getAttribute('desc') || 'dropdown menu';
        controller.innerText = `▶ ${this.desc}`;

        // Add event listeners
        controller.addEventListener('click', (event) => {
            this.isOpen ? this.close() : this.open();
        });

        document.addEventListener('click', (event) => {
            // composedPath returns array ordered from deepest element
            // Thus, it works with shadow DOM
            // event.target doesn't work because shadow DOM hides the nodes
            const path = event.composedPath();

            // some method checks if any element matches the condition
            const clickedDropdownElement = path.some(node =>
                node.tagName === 'DROPDOWN-ELEMENT'
            ); // tag name property is always in upercase

            // Run close method if the path includes 'this' HTML element or if a dropdown element was clicked
            if (!path.includes(this) || clickedDropdownElement) this.close();
        });
    }
}

customElements.define('dropdown-menu', DropdownMenu);


class DropdownElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/dropdown/dropdown_element.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;

        this.addEventListener('click', () => {
            const link = this.getAttribute('link') || null;
            if (!link) return;

            document.location = link;
        });
    }
}

customElements.define('dropdown-element', DropdownElement);