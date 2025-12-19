-- defines folder permissions
-- each account with access to the folder gets a row
CREATE TABLE IF NOT EXISTS folder_permissions (
    folder_id INT NOT NULL,
    account_id INT NOT NULL,

    PRIMARY KEY(folder_id, account_id),

    access ENUM('owner', 'admin', 'rw', 'r') NOT NULL,

    FOREIGN KEY (folder_id) REFERENCES folders(folder_id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);
