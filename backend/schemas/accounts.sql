CREATE TABLE IF NOT EXISTS accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(24) NOT NULL UNIQUE,
    `password` VARCHAR(24) NOT NULL,

    session_token VARCHAR(255),
    session_created_at DATETIME,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);