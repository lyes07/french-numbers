CREATE ROLE french WITH LOGIN PASSWORD 'password';/* create user and give it a password */

GRANT CONNECT ON DATABASE random_db TO french; /* just to login */

ALTER ROLE french CREATEDB; /* the user can create his own database */

create database numbers; /* create the database */

\c numbers   /* connect into the database */

create table frnum(  /* create the french numbers table */
    id integer primary key not null,
    audio varchar(150) not null,
    word varchar(100) not null
);

insert into frnum values( ,'','');