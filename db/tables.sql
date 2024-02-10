/* install postgresql and login to the admin user ex: postgres */

CREATE ROLE french WITH LOGIN PASSWORD 'password';/* create user and give it a password */

GRANT CONNECT ON DATABASE random_db TO french; /* just to login */

ALTER ROLE french CREATEDB; /* the user can create his own database */

exit /* exit the current user */

psql -U french -h localhost -d random_db -p your_port /* connect to the new user */

create database numbers; /* create the database */

exit /* exit the french user */

psql -U postgres  /* connect to the postgres or any user with admin rights */

REVOKE CONNECT ON DATABASE random_db FROM french; /* just to login */

exit /* exit the Admin user for the last time */

psql -U french -h localhost -d numbers -p your_port /*port ex:5432*/ /* connect into the database */
  

create table frnum(  /* create the french numbers table */
    id integer primary key not null,
    audio varchar(150) not null,
    word varchar(100) not null
);

/* fill the french numbers frnum table */
insert into frnum values( ,'','');