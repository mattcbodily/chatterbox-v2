create table if not exists users (
    user_id serial primary key,
    username varchar(30) not null,
    email varchar(150) not null,
    password varchar(250) not null,
    image varchar(250);
);  

create table if not exists groups (
    group_id serial primary key,
    group_name varchar(30),
    group_description text,
    private_group boolean,
    group_image varchar(250)
);

create table if not exists user_group_join (
    join_id serial primary key,
    user_id int references users(user_id),
    group_id int references groups(group_id)
);

create table if not exists messages (
    message_id serial primary key,
    group_id int references groups(group_id),
    sender int references users(user_id),
    message text
);