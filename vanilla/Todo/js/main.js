// this code is gross, im learning here mmk?

const input = document.querySelector("#inputfield");
const itemContainer = document.querySelector(".item-container");

let todoCount = 0;

const todos = [];

function getInputText() {
  return input.value;
}

function clearAll() {
  for (const todo of todos) {
    itemContainer.removeChild(todo);
  }

  todos.length = 0;
  saveTodos();
}

function submit() {
  const text = getInputText();

  if (!text) {
    alert("Todo cannot be empty!");
  } else {
    addTodo(text);
  }
}

function addTodo(text) {
  const id = createTodoId(++todoCount);

  const div = createTodo(id, text);

  itemContainer.appendChild(div);
  todos.push(div);

  saveTodos();
}

function createTodo(id, text) {
  const todoHtml = `
  <span>${text}</span>
  <div>
      <button id="clear-todo" class="hover-red" onclick="removeTodo('${id}')">X</button>
      <button id="done-todo" class="hover-green" onclick="markDone('${id}')">V</button>
  </div>
  `;

  const div = document.createElement("div");
  div.classList.add("todo-item");
  div.id = id;

  div.innerHTML = todoHtml;

  return div;
}

function createTodoId(number) {
  return `todo-${number}`;
}

function markDone(id) {
  const span = document.querySelector(`#${id} > span`);

  if (!span.classList.contains("done")) {
    span.classList.add("done");
  } else {
    span.classList.remove("done");
  }

  saveTodos();
}

function removeTodo(id) {
  const item = findTodo(id);

  itemContainer.removeChild(item);

  const all = [...todos];

  todos.length = 0;

  todos.push(...all.filter((el) => el.id !== id));

  saveTodos();
}

function findTodo(id) {
  const todo = todos.filter((el) => el.id === id);

  return todo[0];
}

function saveTodos() {
  const arr = [];

  for (const todo of todos) {
    const id = todo.id;

    const text = todo.children[0].innerHTML;

    const obj = { id, text };

    arr.push(obj);
  }

  localStorage.setItem("todos", JSON.stringify(arr));
}

function loadTodos() {
  const t = localStorage.getItem("todos");

  if (!t) return;

  const array = JSON.parse(t);

  if (array.length === 0) {
    return;
  }

  for (const { id, text } of array) {
    const todo = createTodo(id, text);

    todos.push(todo);

    itemContainer.appendChild(todo);
  }

  todoCount = parseInt(todos[todos.length - 1].id.split("-")[1]);
}

window.onload = () => {
  loadTodos();

  input.value = ''
};
