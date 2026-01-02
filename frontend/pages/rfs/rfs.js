import PermissionMenu from '/rfs/permission_menu.js';
const permission_menu = new PermissionMenu();

// Folder path array stores folder hierarchy of the folder the user is in
let folder_path = [{folder_id: '', folder_name: ''}]; // for root dir
// let selected_resources = [{type: '', id: ''}];
let selected_resources = []; // an array in case multi-select is necessary later on

let moving = false;
let resources_to_move = [];

// Load resources
async function loadResources() {
    const folder_path_tail = folder_path[folder_path.length - 1];

    // Send request
    const res = await fetch(`/api/rfs/${folder_path_tail.folder_id}`);
    const res_data = await res.json();

    const resources = res_data.data.resources;

    const table_body = document.querySelector('#tbody');
    table_body.innerHTML = ''; // clear existing rows

    resources.forEach(resource => {
        const tr = document.createElement('tr');

        const resourceIcon = getResourceTypeUnicodeIcon(resource.type, resource.mime_type);
        const resourceSize = sizeToString(resource.size_bytes) || '';

        const ownerId = resource.owner_id || '';
        const permissionLevel = resource.permission_level || '';

        tr.innerHTML = `
            <td>
                <span class="resource_type">${resourceIcon}</span>
                <span class="resource_name" id='link-${resource.id}'>${resource.name}</span>
            </td>
            <td>${resource.created_at}</td>
            <td>${ownerId}</td>
            <td>${permissionLevel}</td>
            <td>${resourceSize}</td>
        `;
        tr.id = `${resource.type}-${resource.id}`;
        tr.setAttribute('data-mime-type', resource.mime_type || 'application/octet-stream');

        
        table_body.appendChild(tr);

        // Add event listener to folders
        if (resource.type === 'folder') {
            tr.addEventListener('click', (event) => {

                if (event.target.id === `link-${resource.id}`) {
                    folder_path.push({folder_id: resource.id, folder_name: resource.name});
                    loadResources();
                } else {
                    if (tr.classList.contains('selected')) {
                        deselectResource(tr);
                    } else {
                        selectResource(tr);
                    }
                }

            });
        } else if (resource.type === 'file') {
            tr.addEventListener('click', (event) => {

                if (event.target.id === `link-${resource.id}`) {
                    // Check if file is viewable (image, video, audio, or PDF)
                    if (resource.mime_type && (resource.mime_type.startsWith('image/') || resource.mime_type === 'application/pdf'||resource.mime_type.startsWith('video/')||resource.mime_type.startsWith('audio/'))) {
                        imageViewer.open(resource.id, resource.name, resource.mime_type);
                    } else {
                        downloadFile(resource.id);
                    }
                }

                if (tr.classList.contains('selected')) {
                    deselectResource(tr);
                } else {
                    selectResource(tr);
                }

            });
        }
    });

    // Load path data display
    const rfs_path = document.querySelector('.rfs_path');
    rfs_path.innerHTML = '';

    const rfs_path_label = document.createElement('p');
    rfs_path_label.classList.add('rfs_path_label');
    rfs_path_label.innerText = 'Current folder:';

    const rfs_path_elements = (() => {
        let elements = [];

        // For sub-directories
        for (let i = 0; i < folder_path.length; i++) {
            const rfs_path_element = document.createElement('span');
            rfs_path_element.classList.add('rfs_path_element');
            rfs_path_element.innerText = `${folder_path[i].folder_name}/`;

            rfs_path_element.addEventListener('click', () => {
                // Slice the folder_path array to include 0 up to the i-th element (inclusive)
                folder_path = folder_path.slice(0, i + 1);
                loadResources();
            });

            elements.push(rfs_path_element);
        }

        return elements;
    })();


    // Add all elements to rfs_path div
    rfs_path.append(rfs_path_label);
    rfs_path_elements.forEach(rfs_path_element => {
        rfs_path.append(rfs_path_element);
    });

    // Update current directory text
    const currentDir = document.querySelector('#currentDirectory');
    if (folder_path.length === 1) {
        currentDir.innerText = 'Root directory';
    } else {
        currentDir.innerText = folder_path[folder_path.length - 1].folder_name;
    }
}

function getResourceTypeUnicodeIcon(resource_type, mime_type) {
    if (resource_type === 'folder') return '📁';

    // All images
    if (mime_type.startsWith('image/')) return '🖼️';

    // Archives / ZIPs
    if (mime_type === 'application/zip' ||
        mime_type === 'application/x-zip-compressed' ||
        mime_type === 'application/x-rar-compressed' ||
        mime_type === 'application/gzip' ||
        mime_type === 'application/x-tar') {
        return '📦';
    }

    // Executable / Apps
    if (mime_type === 'application/x-msdownload' || // .exe
        mime_type === 'application/vnd.apple.installer+xml' || // macOS
        mime_type === 'application/x-sh' || // shell script
        mime_type === 'application/octet-stream') { // generic binary
        return '⚙️';
    }

    // PDFs
    if (mime_type === 'application/pdf') return '📕';

    // Text files
    if (mime_type === 'text/plain') return '📝';

    // Audio
    if (mime_type.startsWith('audio/')) return '🎵';

    // Video
    if (mime_type.startsWith('video/')) return '🎬';

    // Default / unknown file
    return '📄';
}

function sizeToString(size_bytes, precision = 2) {
    if (!size_bytes) return;
    if (size_bytes === 0) return '0 B';

    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let magnitude = 0;
    let newSize = size_bytes;

    while (newSize >= 1000 && magnitude < units.length - 1) {
        newSize /= 1000;
        magnitude++;
    }

    return `${newSize.toFixed(precision)} ${units[magnitude]}`;
}


// load root
loadResources();


async function downloadFile(file_id) {
    // Don't use fetch here when just downloading
    window.location.href = `/api/rfs/download/${file_id}`;
}

// File upload
async function uploadFile(file) {
    const currentFolderId = folder_path[folder_path.length - 1].folder_id;
    if (currentFolderId === '') return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`/api/rfs/upload/${currentFolderId}`, {
        method: 'POST',
        body: formData
    });

    if (!res.ok) console.error('Upload failed');

    loadResources();
}

const fileInput = document.querySelector('#upload');
document.getElementById("upload_file").addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', async () => {
    if (fileInput.files.length <= 0) return console.warn('Please select a file to upload.');

    const file = fileInput.files[0];
    uploadFile(file);

    // Clear the input, so the 'change' listener detects a change if the same file is uploaded again
    fileInput.value = '';
});

// Delete

async function deleteFile(file_id) {
    if (confirm("Are you sure you want to delete this file?")) {
        const res = await fetch(`/api/rfs/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'file',
                resource_id: file_id
            })
        });

        if (!res.ok) console.error('Deletion failed');

        loadResources();
    }
}

async function deleteFolder(folder_id) {
    if (confirm("Are you sure you want to delete this folder and all its contents?")) {
        const res = await fetch(`/api/rfs/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'folder',
                resource_id: folder_id
            })
        });

        if (!res.ok) console.error('Deletion failed');

        loadResources();
    }
}

async function moveFile(file_id, new_parent_folder) {
    const res = await fetch(`/api/rfs/move`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: 'file',
            resource_id: file_id,
            new_parent_folder: new_parent_folder
        })
    });

    if (!res.ok) console.error('Operation failed');

    loadResources();
}

async function moveFolder(folder_id, new_parent_folder) {
    const res = await fetch(`/api/rfs/move`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: 'folder',
            resource_id: folder_id,
            new_parent_folder: new_parent_folder
        })
    });

    if (!res.ok) console.error('Operation failed');

    loadResources();
}

// New folder
document.querySelector('#new_folder').addEventListener('click', async (event) => {
    event.preventDefault(); // prevent page reload

    const folder_name = prompt('Folder name: ');
    if (!folder_name) return;

    const reqBody = (() => {
        if (folder_path.length === 1) {
            return JSON.stringify({
                folder_name: folder_name,
                parent_folder_id: null
            });
        } else {
            return JSON.stringify({
                folder_name: folder_name,
                parent_folder_id: folder_path[folder_path.length - 1].folder_id
            });
        }
    })();

    const res = await fetch(`/api/rfs/folder`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: reqBody
    });

    if (!res.ok) console.error('Upload failed');

    loadResources();
    
});

// Go to parent directory
document.querySelector('#goToParentDirectory').addEventListener('click', (event) => {
    if (folder_path.length === 0) return;

    if (folder_path.length === 1) {
        folder_path = [{folder_id: '', folder_name: ''}];
    } else {
        folder_path.pop();
    }
    
    loadResources();
});

// Resource selection
function selectResource(rowElement) {
    rowElement.classList.add('selected');
    selected_resources = [getResourceData(rowElement)];
}

function deselectResource(rowElement) {
    if (rowElement.classList.contains('selected')) {
        rowElement.classList.remove('selected');
        
        selected_resources = [];
    }
}

function deselectAllResources() {
    const selected = document.querySelectorAll('.selected');
    for (const ele of selected) {
        ele.classList.remove('selected');
    }

    selected_resources = [];
}

function getResourceData(rowElement) {
    const elementId = rowElement.id;
    const [type, resource_id] = elementId.split('-');

    return {
        type: type,
        id: Number(resource_id)
    };
}

// Resource selection event listener
document.addEventListener('click', (event) => {
    const rows = document.querySelectorAll('tbody tr');
    for (const row of rows) {
        if (!row.contains(event.target)) {
            // Make sure rows that were not clicked on are deselected
            deselectResource(row);
        }
    }
});

// Rename
document.querySelector('#rename').addEventListener('click', async (event) => {
    event.preventDefault(); // prevent page reload

});

// Move
const move = document.querySelector('#move');
move.addEventListener('click', (event) => {
    event.preventDefault(); // prevent page reload

    if (selected_resources.length === 0) return alert("Please select a resource to move.");

    resources_to_move = [selected_resources[0]];

    moving = true;
    move.innerText = 'Move here';

    const mainNav = document.querySelector('.main-nav');
    mainNav.style.display = 'none';
    const moveNav = document.querySelector('.move-nav');
    moveNav.style.display = 'block';

});

const cancel_move = document.querySelector('#cancel_move');
cancel_move.addEventListener('click', (event) => {
    event.preventDefault(); // prevent page reload

    resources_to_move = [];

    moving = false;
    move.innerText = 'Move';

    const mainNav = document.querySelector('.main-nav');
    mainNav.style.display = 'block';
    const moveNav = document.querySelector('.move-nav');
    moveNav.style.display = 'none';
});

const move_here = document.querySelector('#move_here');
move_here.addEventListener('click', async (event) => {
    event.preventDefault(); // prevent page reload

    const currentFolder = folder_path[folder_path.length - 1];
    if (resources_to_move[0].type === 'folder') {
        await moveFolder(resources_to_move[0].id, currentFolder.folder_id);
    } else if (resources_to_move[0].type === 'file') {
        await moveFile(resources_to_move[0].id, currentFolder.folder_id);
    }

    moving = false;
    move.innerText = 'Move';

    const mainNav = document.querySelector('.main-nav');
    mainNav.style.display = 'block';
    const moveNav = document.querySelector('.move-nav');
    moveNav.style.display = 'none';

});

// Delete
document.querySelector('#delete').addEventListener('click', async (event) => {
    event.preventDefault(); // prevent page reload

    if (selected_resources.length === 0) return;

    const type = selected_resources[0].type;
    if (type === 'folder') {
        deleteFolder(selected_resources[0].id);
    } if (type === 'file') {
        deleteFile(selected_resources[0].id);
    }
});


// Custom context menu
function openContextMenu(menuOptions, left = 0, top = 0) {
    // menuOptions is an array of objects
    // Each element of the array is an option
    // Each object: {option_type: 'label/button' text: "string", id: "html_element_id", callback: onclick_callback_function}
    
    const menuEle = document.createElement('div');
    menuEle.classList.add('ctx_menu');

    menuEle.style.top = `${top}px`;
    menuEle.style.left = `${left}px`;

    for (const option of menuOptions) {
        const {option_type, text, id, callback = null} = option;

        const optionEle = document.createElement('div');
        optionEle.classList.add('ctx_menu_option');

        optionEle.innerText = text;
        optionEle.id = id;

        switch (option_type) {
            case 'label':
                optionEle.classList.add('label');
                break;
            case 'button':
                optionEle.classList.add('button');
                break;
        }

        if (callback) optionEle.addEventListener('click', callback);

        menuEle.append(optionEle);
    }

    document.body.append(menuEle);

}

function closeContextMenu() {
    const menuEle = document.querySelector('.ctx_menu');
    menuEle?.remove();
}

// Close context menu if click is detected outside of menu
document.addEventListener('click', (event) => {
    if (!event.target.closest('.ctx_menu')) {
        closeContextMenu();
    }
});

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    deselectAllResources();

    // Close context menu if click was not on context menu
    if (!event.target.closest('.ctx_menu')) {
        closeContextMenu();
    }

    const rowElement = event.target.closest('tr');
    if (!rowElement) return;

    selectResource(rowElement); // gets closest tr in dom tree

    const resource_name = rowElement.querySelector('.resource_name').innerText;
    
    if (selected_resources[0].type === 'folder') {

        const options = [
            {option_type: 'label', text: resource_name, id: ''},
        ];

        // If clicked on a root folder
        if (folder_path.length === 1) {
            options.push({option_type: 'button', text: "Edit Permissions", id: 'open_permission_controller', callback: () => {
                closeContextMenu();
                permission_menu.open(resource_name, selected_resources[0].id);
            }});
        }

        openContextMenu(options, event.pageX, event.clientY);
    } else if (selected_resources[0].type === 'file') {
        
    }

});