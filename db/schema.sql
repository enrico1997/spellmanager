-- Drops the spells_db if it exists currently --
DROP DATABASE IF EXISTS `spells_db`;
-- Creates the "spells_db" database --
CREATE DATABASE `spells_db`;

USE `spells_db`;

CREATE TABLE `spells` (
  `id` Int( 11 ) AUTO_INCREMENT NOT NULL,
  `spell_name` VARCHAR( 255 ) NOT NULL,
  `cast` BOOLEAN NOT NULL DEFAULT 0,
  `date` DATETIME NOT NULL,
  PRIMARY KEY ( `id` ) );

/* Tests to validate database created properly */
DESC `spells`;
SELECT * FROM `spells`;
