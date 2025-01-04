use glvcdb;

CREATE TABLE client_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    address TEXT,
    password VARCHAR(255) NOT NULL
);
CREATE TABLE meeting_info (
	id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(100) NOT NULL,
    npeople int NOT NULL,
    time date NOT NULL,
    client_id int NOT NULL
);
-- truncate table client_info;
-- drop table meeting_info;

select * from client_info;

-- INSERT INTO client_info (name, email, address, password) VALUES ('John Doe', 'john@example.com', '123 Main St', 'Password123$');
ALTER TABLE meeting_info
ADD CONSTRAINT fk_client_id FOREIGN KEY (client_id) REFERENCES client_info(id) ON DELETE CASCADE;