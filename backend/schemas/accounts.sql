CREATE TABLE IF NOT EXISTS accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(24) NOT NULL UNIQUE,
    `password` VARCHAR(24) NOT NULL,

    privilege_level TINYINT NOT NULL DEFAULT 1,
    -- 0 suspended
    -- 1 standard user
    -- 2 admin
    -- 3 super user

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);