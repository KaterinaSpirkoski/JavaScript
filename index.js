let todos = [];
let index = 0;

class ToDo {
  constructor(_title, _id) {
    this.title = _title;
    this.id = _id;
    this.status = false;
  }
}

function handleSubmitForm(event) {
  event.preventDefault();
  const value = event.target.todoInput.value;
  if (value === "") return;
  const todo = new ToDo(value, index);

  showResults(todo);
  todos.push(todo);

  index++;
  event.target.reset();
}

function showResults(todo) {
  const listItem = document.createElement("li");
  listItem.setAttribute("id", `list-item-${todo.id}`);

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.addEventListener("change", function (event) {
    statusChange(event, todo);
  });

  const label = document.createElement("label");
  label.textContent = todo.title;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function (event) {
    deleteTodoItem(event);
  });

  listItem.appendChild(input);
  listItem.appendChild(label);
  listItem.appendChild(deleteButton);

  const results = document.querySelector("#results");
  results.appendChild(listItem);
}

function statusChange(event, todo) {
  const checked = event.target.checked;
  const listItem = event.target.parentElement;
  if (checked) {
    listItem.classList.add("done");
  } else {
    listItem.classList.remove("done");
  }
  todo.status = checked;
}

function deleteTodoItem(event) {
  const listItem = event.target.parentElement;
  const listItemId = +listItem.id.split("-")[2];
  let deletedIndex = todos.findIndex((el) => el.id === listItemId);
  todos.splice(deletedIndex, 1);

  listItem.remove();
  console.log(todos);
}

const form = document.querySelector("#form");
form.addEventListener("submit", handleSubmitForm);
