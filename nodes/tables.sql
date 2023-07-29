-- create table entries (
--     id integer primary key auto_increment,
--     title varchar(100), 
--     notes varchar (1000),
--     done boolean default false 
-- );

create table (
  id integer primary key auto_increment, 
  email varchar(100) not null unique, 
  hash varchar(1000)
  );