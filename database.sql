CREATE DATABASE assetflow_db;

USE assetflow_db;

CREATE TABLE entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entry_type ENUM('expense', 'asset') NOT NULL,
    entry_name VARCHAR(255) NOT NULL,
    entry_amount DECIMAL(10, 2) NOT NULL,
    entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO entries (entry_type, entry_name, entry_amount)
VALUES
('expense', 'Groceries' 150.75),
('asset', 'savings', 2000.00);

SELECT * FROM entries;

SELECT
SUM (CASE WHEN entry_type = 'expense' THEN entry_amount ELSE 0 END) AS total_expenses,
SUM (CASE WHEN entry_type = 'asset' THEN entry_amount ELSE 0 END) AS total_assets
FROM entries;

SELECT * FROM entries
ORDER BY entry_date DESC;
