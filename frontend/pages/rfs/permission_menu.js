export default class PermissionMenu {
    open() {
        const permissionMenuModal = document.createElement('div');
        permissionMenuModal.classList.add('permission_menu_modal');

        const permissionMenuContainer = document.createElement('div');
        permissionMenuContainer.classList.add('permission_menu_container');


        permissionMenuModal.append(permissionMenuContainer);


        document.body.append(permissionMenuModal);

    }

    close() {

    }
}