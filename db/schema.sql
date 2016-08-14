DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS preferences;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255)
);

CREATE TABLE preferences (
  id SERIAL PRIMARY KEY,
  preference VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) REFERENCES users(email)
);
