
const fileInput = document.getElementById("fileToUpload");
const chooseBtn = document.getElementById("chooseBtn");
const fileName = document.getElementById("fileName");

chooseBtn.addEventListener("click", () => {
    fileInput.click(); // open file picker
});

fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
        fileName.textContent = fileInput.files[0].name;
    } else {
        fileName.textContent = "No file selected";
    }
});

async function uploadFile(file) {
    const formData = new FormData();
    formData.append("upload", file);

    const res = await fetch("/api/file_sharing/upload", {
        method: "POST",
        body: formData
    });

    if (!res.ok) throw new Error("Upload failed");

    await loadFiles(); // refresh table after upload
}

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("fileToUpload");
    if (!fileInput.files.length) return;

    await uploadFile(fileInput.files[0]);
});

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
loadFiles();

//ask chat gpt to suggest changes to backend/routes/api/red_fs.js to match the frontend/pages/debug/fs/fs.js upload endpoint :) json
