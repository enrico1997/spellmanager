$(document).ready(function() {
  // Getting a reference to the input field where user adds a new todo
  var $newItemInput = $("input.new-item");
  // Our new todos will go inside the todoContainer
  var $todoContainer = $(".todo-container");
  var $todoContainerCast = $(".todo-container1");
  // Adding event listeners for deleting, editing, and adding spells
  $(document).on("click", "button.delete", deleteTodo);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".todo-item", editTodo);
  $(document).on("keyup", ".todo-item", finishEdit);
  $(document).on("blur", ".todo-item", cancelEdit);
  $(document).on("submit", "#todo-form", insertTodo);

  // Our initial todos array
  var todos = [];

  // Getting spells from database when page loads
  getTodos();

  // This function resets the todos displayed with new spells from the database
  function initializeRows() {
    $todoContainer.empty();
    $todoContainerCast.empty();
    var rowsToAdd = [];
    var rowsToAdd1 = [];
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].cast === 0) {
        rowsToAdd.push(createNewRow(todos[i]));
      } else {
        rowsToAdd1.push(createNewRowCast(todos[i]));
      }
    }
    $todoContainer.prepend(rowsToAdd);
    $todoContainerCast.prepend(rowsToAdd1);
  }

  // This function grabs spells from the database and updates the view
  function getTodos() {
    $.get("/api/todos", function(data) {
      todos = data;
      initializeRows();
    });
  }

  // This function deletes a todo when the user clicks the delete button
  function deleteTodo(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/todos/" + id
    }).done(getTodos);
  }

  // This function handles showing the input box for a user to edit a todo
  function editTodo() {
    var currentTodo = $(this).data("todo");
    $(this).children().hide();
    $(this).children("input.edit").val(currentTodo.spell_name);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // Toggles "cast" status
  function toggleComplete(event) {
    event.stopPropagation();
    var todo = $(this).parent().data("todo");
    todo.cast = 1;
    updateTodo(todo);
  }

  // This function starts updating a todo in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit() {
    var updatedTodo = $(this).data("todo");
    if (event.keyCode === 13) {
      updatedTodo.spell_name = $(this).children("input").val().trim();
      $(this).blur();
      updateTodo(updatedTodo);
    }
  }

  // This function updates a todo in our database
  function updateTodo(todo) {
    $.ajax({
      method: "PUT",
      url: "/api/todos",
      data: todo
    }).done(getTodos);
  }

  // This function is called whenever a todo item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentTodo = $(this).data("todo");
    if (currentTodo) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentTodo.spell_name);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a todo-item row
  function createNewRow(todo) {
    var $newInputRow = $(
      [
        "<li class='list-group-item todo-item'>",
        "<span>",
        todo.spell_name,
        "</span>",
        "<input type='text' class='edit' style='display: none;'> ",
        "<button id='deleteButton' class='delete btn btn-default'>Expelliarmus</button>",
        "<button class='complete btn btn-default'>Accio</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", todo.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("todo", todo);
    return $newInputRow;
  }

    // This function constructs a "spell that's been cast" row
  function createNewRowCast(todo) {
    var $newInputRow = $(
      [
        "<li class='list-group-item todo-item animated pulse'>",
        "<span>",
        todo.spell_name,
        "</span>",
        "<input type='text' class='edit' style='display: none;'> ",
        "<button id='deleteButton' class='delete btn btn-default'>Expelliarmus</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", todo.id);
    $newInputRow.data("todo", todo);
    $newInputRow.find("span").css("text-decoration", "line-through");
    return $newInputRow;
  }

  // This function inserts a new todo into our database and then updates the view
  function insertTodo(event) {
    event.preventDefault();
    var todo = {
      spell_name: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/todos", todo, getTodos);
    $newItemInput.val("");
  }
});
