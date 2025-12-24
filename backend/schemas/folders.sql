-- METADATA STORAGE FOR FOLDERS
CREATE TABLE IF NOT EXISTS folders (
    folder_id INT AUTO_INCREMENT PRIMARY KEY,
    parent_folder_id INT NULL, -- by default, no parent folder

    owner_id INT NOT NULL,
    folder_name VARCHAR(255) NOT NULL,
    path VARCHAR(500) NOT NULL, -- absolute disk path (where files are stores on the server)
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (owner_id) REFERENCES accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_folder_id) REFERENCES folders(folder_id) ON DELETE CASCADE -- when parent folder is deleted, delete child folder
);
