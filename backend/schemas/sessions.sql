CREATE TABLE IF NOT EXISTS sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,

    created_at DATETIME NOT NULL,
    expires_at DATETIME NOT NULL,

    -- creates foreign key that references accounts.id, delete session when account is deleted
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);
