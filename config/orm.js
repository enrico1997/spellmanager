// *********************************************************************************
// orm.js - This file offers a set of easier-to-use methods for interacting with the MySQL db.
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require("./connection.js");

// ORM
// =============================================================

var tableName = "spells";
var CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };

var orm = {

  // Here our ORM is creating a simple method for performing a query of the entire table.
  // We make use of the callback to ensure that data is returned only once the query is done.
  allSpells: function(callback) {
    var s = "SELECT * FROM " + tableName;

    connection.query(s, function(err, result) {
      callback(result);
    });
  },

  // Here our ORM is creating a simple method for performing a query of a single spell in the table.
  // Again, we make use of the callback to grab a specific spell from the database.
  searchSpell: function(name, callback) {
    var s = "select * from " + tableName + " where routeName=?";

    connection.query(s, [name], function(err, result) {
      callback(result);
    });
  },

  // Here our ORM is creating a simple method for adding spells to the database
  // Effectively, the ORM's simple addSpell method translates into a more complex SQL INSERT statement.
  addSpell1: function(spell, callback) {

    // Creating a routeName so its easy to search.
    var spellName = spell.name.replace(/\s+/g, "").toLowerCase();
    var nowDate = "now()";
    console.log(spellName);

    var s = "INSERT INTO " + tableName + " (spellName, nowDate) VALUES (?,?)";

    connection.query(s, [spellName, date], function(err, result) {
      callback(result);
    });
  },

  // Here our ORM is creating a simple method for adding spells to the database
  // Effectively, the ORM's simple addSpell method translates into a more complex SQL INSERT statement.
  addSpell: function(todo, callback) {
    var s = "INSERT INTO " + tableName + " (spell_name, cast, date) VALUES (?,?,?)";
    todo.cast = todo.cast || 0;
    console.log("hello: ", s, CURRENT_TIMESTAMP);
    connection.query(s, [
      todo.spell_name, todo.cast, CURRENT_TIMESTAMP
    ], function(err, result) {
      console.log("err: ", err);
      console.log("result: ", result);
      callback(result);
    });
  },

  //   // Here our ORM is creating a simple method for updainting spells in the database
  // // Effectively, the ORM's simple editSpell method translates into a more complex SQL INSERT statement.
  editSpell: function(todo, callback) {
    var s = "UPDATE " + tableName + " SET spell_name=? WHERE id=?";
    connection.query(s, [
      todo.spell_name, todo.id
    ], function(err, result) {
      callback(result);
    });
  }
  //   // Here our ORM is creating a simple method for updaint spells to the database
  // // Effectively, the ORM's simple updateSpell method translates into a more complex SQL INSERT statement.
  // updateSpell: function(spell, callback) {

  //   // Creating a routeName so its easy to search.
  //   var spellName = spell.name.replace(/\s+/g, "").toLowerCase();
  //   var nowDate = "now()";
  //   console.log(spellName);

  //   var s = "INSERT INTO " + tableName + " (spellName, nowDate) VALUES (?,?)";

  //   connection.query(s, [spellName, date], function(err, result) {
  //     callback(result);
  //   });
  // }
};

module.exports = orm;
