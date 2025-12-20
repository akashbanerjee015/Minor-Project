-- Drizzle migration: create users table
CREATE TABLE IF NOT EXISTS users (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE
);
