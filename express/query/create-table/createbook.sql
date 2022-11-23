-- SQLite
CREATE TABLE book(
id integer PRIMARY KEY,
user_id integer NOT NULL,
date text NOT NULL,
room_id integer NOT NULL,
fnb_id integer,
FOREIGN KEY (user_id) REFERENCES user (id),
FOREIGN KEY (room_id) REFERENCES room (id),
FOREIGN KEY (fnb_id) REFERENCES fnb (id)
);