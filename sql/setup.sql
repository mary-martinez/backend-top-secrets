-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if EXISTS users;
DROP table if EXISTS secrets;

CREATE table users(
  id BIGINT GENERATED ALWAYS as IDENTITY PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password_hash VARCHAR NOT NULL
);

CREATE table secrets(
  id BIGINT GENERATED ALWAYS as IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  created_at TIMESTAMP
);

INSERT INTO secrets (title, description) VALUES
('Shh', 'top secret info here'),
('Oh no', 'its another secret');
