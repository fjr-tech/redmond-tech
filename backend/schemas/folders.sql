-- METADATA STORAGE FOR FOLDERS
CREATE TABLE IF NOT EXISTS folders (
    folder_id INT AUTO_INCREMENT PRIMARY KEY,
    parent_folder_id INT NULL, -- by default, no parent folder

    owner_id INT NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    stored_name VARCHAR(255) NOT NULL, -- folder name saved on disk by multer
    path VARCHAR(500) NOT NULL, -- absolute disk path
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_folder_id) REFERENCES folders(folder_id) ON DELETE CASCADE -- when parent folder is deleted, delete child folder
);
