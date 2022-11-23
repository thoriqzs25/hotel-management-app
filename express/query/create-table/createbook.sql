-- SQLite
CREATE TABLE roomBook(
id integer PRIMARY KEY,
user_id integer NOT NULL,
date text NOT NULL
FOREIGN KEY (user_id) REFERENCES user (id)
);