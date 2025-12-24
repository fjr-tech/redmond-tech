async function uploadFile(file) {
    const formData = new FormData();
    formData.append("upload", file);

    const res = await fetch("/api/red_fs/upload", {
        method: "POST",
        body: formData
    });

    if (!res.ok) throw new Error("Upload failed");

    // await loadFiles(); // refresh table after upload
}

async function loadFiles() {
    const res = await fetch("/api/file_sharing/list"); // Adjust endpoint as needed
    const files = await res.json();

    const tbody = document.getElementById("fileTableBody");
    tbody.innerHTML = ""; // clear existing rows

    files.forEach(file => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${file.name}</td>
            <td>${file.created}</td>
            <td>${file.modified}</td>
            <td>${file.size}</td>
        `;

        tbody.appendChild(tr);
    });
}
//loadFiles();

//ask chat gpt to suggest changes to backend/routes/api/red_fs.js to match the frontend/pages/debug/fs/fs.js upload endpoint :) json

////////////////////////

// Init

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