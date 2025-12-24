-- defines folder permissions
-- each account with access to the folder gets a row
CREATE TABLE IF NOT EXISTS folder_permissions (
    folder_id INT NOT NULL,
    account_id INT NOT NULL,

    PRIMARY KEY(folder_id, account_id),

    permission_level TINYINT NOT NULL,
    -- 0 [this level is not in use]
    -- 1 read
    -- 2 read/write
    -- 3 admin
    -- 4 owner

    FOREIGN KEY (folder_id) REFERENCES folders(folder_id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);
