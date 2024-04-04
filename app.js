window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const formElement = document.querySelector("#new-todo-form");
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const indTodoElement = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };
    todos.push(indTodoElement);
    sorted_todos = todos.sort(function (a, b) {
      return b.createdAt - a.createdAt;
    });
    localStorage.setItem("todos", JSON.stringify(sorted_todos));

    e.target.reset();
    displayTodos();
  });
  displayTodos();
});

function displayTodos() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteBtn = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");

    if (todo.category === "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("business");
    }
    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteBtn.classList.add("delete");
    content.innerHTML = `<input type="text" value="${todo.content}" readonly/>`;
    edit.innerHTML = '<span class="material-symbols-outlined">edit_note</span>';
    deleteBtn.innerHTML =
      '<span class="material-symbols-outlined">delete</span>';
    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteBtn);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);
    if (todo.done) {
      todoItem.classList.add("done");
    }
    input.addEventListener("click", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      displayTodos();
    });

    edit.addEventListener("click", (e) => {
      if (todo.done !== true) {
        const input = content.querySelector("input");
        input.removeAttribute("readonly");
        input.focus();
        input.addEventListener("blur", (e) => {
          input.setAttribute("readonly", true);
          todo.content = e.target.value;
          localStorage.setItem("todos", JSON.stringify(todos));
          displayTodos();
        });
      }
    });
    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      displayTodos();
    });
  });
}
