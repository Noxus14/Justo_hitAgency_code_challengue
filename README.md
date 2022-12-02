# Justo Code Challenge

## Requirements
- Need install nodeJs and NPM.
- Postgres DataBase

## How to use.
1. use the command `npm install` for download the dependency
2. use the command `node index.js` for start the server

## Postman documentation.
[Documentation](https://documenter.getpostman.com/view/8070063/2s8YzL46TQ)

## Scrip of the Postgres Database
```
-- Database: hitsagency

-- DROP DATABASE IF EXISTS hitsagency;

CREATE DATABASE hitsagency
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Mexico.1252'
    LC_CTYPE = 'Spanish_Mexico.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE roles (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50)
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	id_role INTEGER,
	name VARCHAR(50),
	email VARCHAR(100),
	password VARCHAR(250)
);

CREATE TABLE hits (
	id SERIAL PRIMARY KEY,
	hit_name VARCHAR(50),
	description VARCHAR(200),
	status VARCHAR(15),
	manager_id INTEGER,
	manager_name VARCHAR(60)
);

CREATE TABLE user_to_hit (
	id SERIAL PRIMARY KEY,
	id_user INTEGER,
	id_hit INTEGER
);

ALTER TABLE users
ADD CONSTRAINT id_role
FOREIGN KEY (id_role)
REFERENCES roles(id)
ON DELETE CASCADE;

ALTER TABLE user_to_hit
ADD CONSTRAINT id_user
FOREIGN KEY (id_user)
REFERENCES users(id)
ON DELETE CASCADE;

ALTER TABLE user_to_hit
ADD CONSTRAINT id_hit
FOREIGN KEY (id_hit)
REFERENCES hits(id)
ON DELETE CASCADE;
``` 