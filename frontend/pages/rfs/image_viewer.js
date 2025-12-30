// Image Viewer Modal
class ImageViewer {
    constructor() {
        this.currentFileId = null;
        this.currentFileName = null;
        this.currentMimeType = null;
        this.isVisible = false;
        this.currentFileIndex = -1;
        this.initModal();
    }

    initModal() {
        // Create modal HTML
        const modalHTML = `
            <div id="image-viewer-modal" class="image-viewer-modal">
                <div class="image-viewer-container">
                    <div class="image-viewer-header">
                        <h3 id="image-viewer-title"></h3>
                        <button id="image-viewer-close" class="image-viewer-close">&times;</button>
                    </div>
                    <div class="image-viewer-content">
                        <div class="image-viewer-display">
                            <div id="image-viewer-loading" style="display: none; text-align: center; padding: 40px; font-size: 18px; color: #707070ff;">Loading...</div>
                            <img id="image-viewer-img" src="" alt="Viewer">
                            <embed id="image-viewer-pdf" type="application/pdf" style="display: none;" width="100%" height="100%">
                        </div>
                    </div>
                    <div class="image-viewer-footer">
                        <button id="image-viewer-prev" class="image-viewer-nav-btn">← Previous</button>
                        <button id="image-viewer-download" class="image-viewer-nav-btn">Download</button>
                        <button id="image-viewer-next" class="image-viewer-nav-btn">Next →</button>
                    </div>
                </div>
            </div>
            
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Get modal element
        this.modal = document.getElementById('image-viewer-modal');
        this.imgElement = document.getElementById('image-viewer-img');
        this.pdfElement = document.getElementById('image-viewer-pdf');
        this.titleElement = document.getElementById('image-viewer-title');

        // Event listeners
        document.getElementById('image-viewer-close').addEventListener('click', () => this.close());
        document.getElementById('image-viewer-download').addEventListener('click', () => this.download());
        document.getElementById('image-viewer-prev').addEventListener('click', () => this.previousFile());
        document.getElementById('image-viewer-next').addEventListener('click', () => this.nextFile());

        // Get loading element
        this.loadingElement = document.getElementById('image-viewer-loading');

        // Close on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isVisible) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.previousFile();
            if (e.key === 'ArrowRight') this.nextFile();
        });
    }

    open(fileId, fileName, mimeType) {
        this.currentFileId = fileId;
        this.currentFileName = fileName;
        this.currentMimeType = mimeType;
        this.isVisible = true;

        this.titleElement.textContent = fileName;

        // Show loading text
        this.loadingElement.style.display = 'block';
        this.imgElement.style.display = 'none';
        this.pdfElement.style.display = 'none';

        // Determine if it's an image or PDF
        if (mimeType.startsWith('image/')) {
            this.imgElement.onload = () => {
                this.loadingElement.style.display = 'none';
                this.imgElement.style.display = 'block';
            };
            this.imgElement.onerror = () => {
                this.loadingElement.textContent = 'Failed to load image';
            };
            this.imgElement.src = `/api/rfs/view/${fileId}`;
        } else if (mimeType === 'application/pdf') {
            this.pdfElement.onload = () => {
                this.loadingElement.style.display = 'none';
                this.pdfElement.style.display = 'block';
            };
            this.pdfElement.onerror = () => {
                this.loadingElement.textContent = 'Failed to load PDF';
            };
            this.pdfElement.src = `/api/rfs/view/${fileId}`;
        }

        this.modal.style.display = 'flex';
    }

    close() {
        this.isVisible = false;
        this.modal.style.display = 'none';
        this.imgElement.src = '';
        this.pdfElement.src = '';
        this.loadingElement.style.display = 'none';
        this.loadingElement.textContent = 'Loading...';
        this.imgElement.onload = null;
        this.imgElement.onerror = null;
        this.pdfElement.onload = null;
        this.pdfElement.onerror = null;
    }

    download() {
        window.location.href = `/api/rfs/download/${this.currentFileId}`;
    }

    previousFile() {
        const rows = document.querySelectorAll('tbody tr');
        let currentIndex = -1;

        for (let i = 0; i < rows.length; i++) {
            const [type, id] = rows[i].id.split('-');
            if (id === this.currentFileId && type === 'file') {
                currentIndex = i;
                break;
            }
        }

        if (currentIndex > 0) {
            let prevIndex = currentIndex - 1;
            while (prevIndex >= 0) {
                const [type, id] = rows[prevIndex].id.split('-');
                if (type === 'file') {
                    const fileName = rows[prevIndex].querySelector('.resource_name').textContent;
                    const mimeType = this.getMimeTypeFromRow(rows[prevIndex]);
                    this.open(id, fileName, mimeType);
                    break;
                }
                prevIndex--;
            }
        }
    }

    nextFile() {
        const rows = document.querySelectorAll('tbody tr');
        let currentIndex = -1;

        for (let i = 0; i < rows.length; i++) {
            const [type, id] = rows[i].id.split('-');
            if (id === this.currentFileId && type === 'file') {
                currentIndex = i;
                break;
            }
        }

console.log(currentIndex);

        let nextIndex = currentIndex + 1;
        while (nextIndex < rows.length) {
            const [type, id] = rows[nextIndex].id.split('-');
            if (type === 'file') {
                const fileName = rows[nextIndex].querySelector('.resource_name').textContent;
                const mimeType = this.getMimeTypeFromRow(rows[nextIndex]);
                this.open(id, fileName, mimeType);
                break;
            }
            nextIndex++;
        }
    }

    getMimeTypeFromRow(row) {
        // Get mime type from data attribute if available
        return row.getAttribute('data-mime-type') || 'application/octet-stream';
    }
}

// Initialize viewer
const imageViewer = new ImageViewer();
