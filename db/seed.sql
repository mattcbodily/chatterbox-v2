create table if not exists users (
    user_id serial primary key,
    username varchar(30) not null,
    email varchar(150) not null,
    password varchar(250) not null
);  