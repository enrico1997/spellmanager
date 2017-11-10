-- Inserted a set of records into the table
INSERT INTO `spells` (`spell_name`, `date`) VALUES ("Expecto Patronum", NOW());
INSERT INTO `spells` (`spell_name`, `date`) VALUES ("Avada Kedavra", NOW());
INSERT INTO `spells` (`spell_name`, `date`) VALUES ("Finestra", NOW());
INSERT INTO `spells` (`spell_name`, `date`) VALUES ("Revelio", NOW());

/* Tests to validate database created properly */
USE `qfr5j6beff03fbuv`;
DESC `spells`;
SELECT * FROM `spells`;

use `todolist`;
select * from `todos`;
desc `todos`;
select * from `allcharacters`;
UPDATE `todos` SET text='hello', updatedAt=NOW() WHERE id=16;


INSERT INTO `todos` (`text`, `complete`, `createdAt`, `updatedAt`) VALUES ("Expecto Patronum", 0, NOW(), NOW());
