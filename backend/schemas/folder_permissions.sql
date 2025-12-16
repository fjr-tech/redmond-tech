-- defines folder permissions
-- each user with access to the folder gets a row
CREATE TABLE IF NOT EXISTS folder_permissions (
    folder_id INT NOT NULL,
    user_id INT NOT NULL,

    PRIMARY KEY(folder_id, user_id),

    access ENUM('owner', 'admin', 'rw', 'r') NOT NULL,

    FOREIGN KEY (folder_id) REFERENCES folders(folder_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
