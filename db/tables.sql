/* install postgresql and login to the admin user ex: postgres */

CREATE ROLE french WITH LOGIN PASSWORD 'password';/* create user and give it a password */

GRANT CONNECT ON DATABASE random_db TO french; /* just to login */

ALTER ROLE french CREATEDB; /* the user can create his own database */

exit /* exit the current user */

psql -U french -h localhost -d random_db -p your_port /* connect to the new user */

create database numbers; /* create the database */

exit /* exit the french user */

psql -U postgres  /* connect to the postgres or any user with admin rights */

REVOKE CONNECT ON DATABASE random_db FROM french; /* revoking then connect right to the random_db  */

exit /* exit the Admin user for the last time */

psql -U french -h localhost -d numbers -p your_port /*port ex:5432*/ /* connect into the database */

/* create a table for each language */  
/* create a table for each language  
English => en
Mandarin Chinese => mc
Hindi => hn
Spanish => sp
Arabic => ar
Bengali => bn
Portuguese =>pr
Russian => ru
Japanese => jp
Javanese => jv
French => fr
*/
/* create the french numbers table */
create table ref(
    code varchar(3) not null,
    language varchar(50) not null
);
insert into ref (code, language) values ('ar','Arabic');
insert into ref (code, language) values ('en','English');
insert into ref (code, language) values ('mc','Mandarin Chinese');
insert into ref (code, language) values ('hn','Hindi');
insert into ref (code, language) values ('sp','Spanish');
insert into ref (code, language) values ('bn','Bengali');
insert into ref (code, language) values ('pr','Portuguese');
insert into ref (code, language) values ('ru','Russian');
insert into ref (code, language) values ('jp','Japanese');
insert into ref (code, language) values ('jv','Javanese');
insert into ref (code, language) values ('fr','French');

create table jv(  
    id integer primary key not null,
    word varchar(100) not null,
    audio text
    );


UPDATE en
SET audio = CASE 
                    WHEN audio LIKE '//%' THEN audio
                    ELSE '//' || audio
                  END;

/* fill the french numbers frnum table */
insert into __num values( ,'','');


CREATE OR REPLACE FUNCTION get_random_rows(lang text)
RETURNS SETOF record AS
$$
DECLARE
    row record;
BEGIN
    FOR row IN EXECUTE format('SELECT * FROM %I WHERE id < 100 ORDER BY random() LIMIT 12', table_name) LOOP
        RETURN NEXT row;
    END LOOP;
    RETURN;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_random_rows(lang text, num_rows integer)
RETURNS SETOF record AS
$$
DECLARE
    row record;
    table_name text;
BEGIN
    IF lang = 'fr' THEN
        table_name := 'fr';
    ELSIF lang = 'en' THEN
        table_name := 'en';
    ELSIF lang = 'ar' THEN
        table_name := 'ar';
    ELSE
        RAISE EXCEPTION 'Invalid language specified: %', lang;
    END IF;
    
    FOR row IN EXECUTE format('SELECT * FROM %I WHERE id <= 100 ORDER BY random() LIMIT $1', table_name) USING num_rows LOOP
        RETURN NEXT row;
    END LOOP;
    RETURN;
END;
$$ LANGUAGE plpgsql;



SELECT * FROM get_random_rows('fr', 12) AS (id integer, word varchar(100), audio text);
