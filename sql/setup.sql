-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if EXISTS users ;

CREATE table users(
  id BIGINT GENERATED ALWAYS as IDENTITY PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password_hash VARCHAR NOT NULL
);
