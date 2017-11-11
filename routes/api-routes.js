// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// grab the orm from the config
// (remember: connection.js -> orm.js -> route file)
var orm = require("../config/orm.js");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the spells
  app.get("/api/todos", function(req, res) {
    orm.getTodos(function(results) {
      res.json(results);
    });
  });

  // POST route for saving a new spell. We can create a spell using the data on req.body
  app.post("/api/todos", function(req, res) {
    orm.addTodo(req.body, function(results) {
      res.json(results);
    });
  });

  // DELETE route for deleting spells. We can access the ID of the spell to delete in
  // req.params.id
  app.delete("/api/todos/:id", function(req, res) {
    orm.deleteTodo(req.params.id, function(results) {
      res.json(results);
    });
  });

  // PUT route for updating spells. We can access the updated spell in req.body
  app.put("/api/todos", function(req, res) {
    orm.editTodo(req.body, function(results) {
      res.json(results);
    });
  });
};
