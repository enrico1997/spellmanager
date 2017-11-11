-- Inserted a set of records into the table
INSERT INTO `spells` (`spell_name`, `date`) VALUES ("Expecto Patronum", NOW());
INSERT INTO `spells` (`spell_name`, `date`) VALUES ("Avada Kedavra", NOW());
INSERT INTO `spells` (`spell_name`, `date`) VALUES ("Finestra", NOW());
INSERT INTO `spells` (`spell_name`, `cast`, `date`) VALUES ("Revelio", true, NOW());


/* Tests to validate database created properly */
DESC `spells`;
SELECT * FROM `spells`;