DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE posts(
    id serial PRIMARY KEY,
    tinkoff_post_id integer,
    type TEXT,
    title TEXT,
    body TEXT,
    date TIMESTAMP,
    img_big TEXT
);