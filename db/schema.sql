-- DROP DATABASE
DROP DATABASE IF EXISTS jog_db;
-- CREATE DATABASE
CREATE DATABASE jog_db;

USE jog_db;
-- this file deletes old db's named ecommerce
-- and creates a new one called ecommerce_db so
-- that we have a clean slate to test and build on
-- use tells mysql which db we're working on