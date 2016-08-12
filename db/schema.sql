DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255)
);

CREATE TABLE preferences (
  user_id INTEGER NOT NULL REFERENCES users(id),
  likes VARCHAR(255) NOT NULL,
  dislikes VARCHAR(255) NOT NULL,
  mehs VARCHAR(255) NOT NULL
);
