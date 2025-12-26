// Folder path array stores folder hierarchy of the folder the user is in
let folder_path = [{folder_id: '', folder_name: ''}]; // for root dir

// Load resources
async function loadResources(folder_path) {
    console.log('loading resources...');

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
                <span class="resource_name" id='${resource.id}'>${resource.name}</span>
            </td>
            <td>${resource.created_at}</td>
            <td>${ownerId}</td>
            <td>${permissionLevel}</td>
            <td>${resourceSize}</td>
        `;

        
        table_body.appendChild(tr);

        // Add event listener to folders
        if (resource.type === 'folder') {
            tr.addEventListener('click', (event) => {

                if (event.target.id == resource.id) {
                    folder_path.push({folder_id: resource.id, folder_name: resource.name});
                    loadResources(folder_path);
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
                loadResources(folder_path);
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
loadResources(folder_path);

// File upload
const fileInput = document.querySelector('#upload');
document.getElementById("upload_file").addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', async () => {
    if (fileInput.files.length <= 0) return console.warn('Please select a file to upload.');

    const file = fileInput.files[0];
    uploadFile(file);
});


// New folder
document.querySelector('#new_folder').addEventListener('click', (event) => {
    event.preventDefault();
    
});

// Go to parent directory
document.querySelector('#goToParentDirectory').addEventListener('click', (event) => {
    if (folder_path.length === 0) return;

    if (folder_path.length === 1) {
        folder_path = [{folder_id: '', folder_name: ''}];
    } else {
        folder_path.pop();
    }
    
    loadResources(folder_path);
});