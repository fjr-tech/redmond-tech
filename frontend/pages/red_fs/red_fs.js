async function uploadFile(file) {
    const formData = new FormData();
    formData.append("upload", file);

    const res = await fetch("/api/rfs/upload", {
        method: "POST",
        body: formData
    });

    if (!res.ok) throw new Error("Upload failed");

    // await loadFiles(); // refresh table after upload
}

async function loadResourcesInFolder(folder_id = '') {

    console.log('loading resources...');

    // Send request
    const res = await fetch(`/api/rfs/${folder_id}`);
    const res_data = await res.json();

    const resources = res_data.data.resources;

    const tbody = document.getElementById("fileTableBody");
    tbody.innerHTML = ""; // clear existing rows

    resources.forEach(resource => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${resource.name}</td>
            <td>${resource.created_at}</td>
            <td>${resource.owner_id}</td>
            <td>${resource.permission_level}</td>
            <td></td>
        `;

        if (resource.type === 'folder') {
            tr.addEventListener('click', () => {
                loadResourcesInFolder(resource.id);
            });
        }
        

        tbody.appendChild(tr);
    });
}
loadResourcesInFolder();

// File upload
const fileInput = document.getElementById("fileToUpload");
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