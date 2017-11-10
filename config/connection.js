// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Requiring mysql package
var mysql = require("mysql");
var connection;

// Setting up our connection information
var source = {
  localhost: {
    port: 3306,
    host: "localhost",
    user: "enrico",
    password: "",
    database: "spells_db"
  },

  // jawsDB
  jawsDB: {
    port: 3306,
    host: "<host name>",
    user: "<name of user>",
    password: "<password>",
    database: "<name of database>"
  }
};


// Creating our connection
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection(source.localhost);
};

// Connecting to the database.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  
  var sql = "CREATE TABLE `spells` ( `id` Int( 11 ) AUTO_INCREMENT NOT NULL, `spell_name` VARCHAR( 255 ) NOT NULL, `cast` BOOLEAN NOT NULL DEFAULT 0, `date` DATETIME NOT NULL, PRIMARY KEY ( `id` ) )";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

});

// Exporting our connection
module.exports = connection;
