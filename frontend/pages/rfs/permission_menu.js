export default class PermissionMenu {
    open(folder_name, folder_id) {
        const permissionMenuModal = document.createElement('div');

        permissionMenuModal.innerHTML = `
            <modal-menu>
                <menu-controls>
                    <close-menu></close-menu>
                </menu-controls>

                <menu-header>
                    <menu-title>${folder_name}</menu-title>
                    <menu-text>Permission menu</menu-text>
                </menu-header>
                
                <menu-body>
                    <menu-text>Administrators</menu-text>
                    <list-input verify-str-src="" id="admins">
                        <list-element>Element 1</list-element>
                        <list-element>Element 2</list-element>
                        <list-add-element>Add element</list-add-element>
                    </list-input>
                    <menu-text>Editors</menu-text>
                    <list-input verify-str-src="" id="editors">
                        <list-element>Element 1</list-element>
                        <list-element>Element 2</list-element>
                        <list-add-element>Add element</list-add-element>
                    </list-input>
                    <menu-text>Viewers</menu-text>
                    <list-input verify-str-src="" id="viewers">
                        <list-element>Element 1</list-element>
                        <list-element>Element 2</list-element>
                        <list-add-element>Add element</list-add-element>
                    </list-input>
                </menu-body>
            </modal-menu>
        `;


        document.body.append(permissionMenuModal);

    }

    close() {

    }
}