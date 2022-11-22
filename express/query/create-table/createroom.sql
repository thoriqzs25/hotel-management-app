-- SQLite
CREATE TABLE room(
id integer PRIMARY KEY,
type text,
specification text,
availability integer NOT NULL,
price integer,
discount integer
);