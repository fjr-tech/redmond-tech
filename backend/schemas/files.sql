-- METADATA STORAGE FOR FILES
CREATE TABLE IF NOT EXISTS files (
    file_id INT AUTO_INCREMENT PRIMARY KEY,
    folder_id INT NOT NULL,

    owner_id INT NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    stored_name VARCHAR(255) NOT NULL, -- filename saved on disk by multer
    path VARCHAR(500) NOT NULL, -- absolute disk path
    mime_type VARCHAR(100),
    size_bytes BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (owner_id) REFERENCES accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (folder_id) REFERENCES folders(folder_id) ON DELETE CASCADE -- delete file when folder is deleted
);
