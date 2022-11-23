-- SQLite
CREATE TABLE room(
id integer PRIMARY KEY,
char text NOT NULL,
type text,
capacity text,
specification text,
availability integer NOT NULL,
price integer,
discount integer
);