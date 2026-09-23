
// // Temporary todo data
// // Later this will come from the Spring Boot REST API.

// let todos = [];


// // ===============================
// // ADD TODO
// // ===============================

// function addTodo() {

//     const input = document.getElementById("todoInput");

//     const task = input.value.trim();

//     if (task === "") {
//         alert("Please enter a task.");
//         return;
//     }

//     const todo = {
//         id: Date.now(),
//         task: task,
//         completed: false
//     };

//     todos.push(todo);

//     input.value = "";

//     displayTodos();
// }


// // ===============================
// // VIEW TODOS
// // ===============================

// function displayTodos() {

//     const todoList = document.getElementById("todoList");

//     todoList.innerHTML = "";

//     todos.forEach(function(todo) {

//         const li = document.createElement("li");

//         li.className = "todo-item";

//         const span = document.createElement("span");

//         span.className = "todo-text";

//         span.textContent = todo.task;

//         if (todo.completed) {
//             span.classList.add("completed");
//         }


//         // Button container
//         const buttonGroup = document.createElement("div");

//         buttonGroup.className = "button-group";


//         // Edit button
//         const editButton = document.createElement("button");

//         editButton.textContent = "Edit";

//         editButton.className = "edit-button";

//         editButton.onclick = function() {
//             editTodo(todo.id);
//         };


//         // Delete button
//         const deleteButton = document.createElement("button");

//         deleteButton.textContent = "Delete";

//         deleteButton.className = "delete-button";

//         deleteButton.onclick = function() {
//             deleteTodo(todo.id);
//         };


//         buttonGroup.appendChild(editButton);
//         buttonGroup.appendChild(deleteButton);

//         li.appendChild(span);
//         li.appendChild(buttonGroup);

//         todoList.appendChild(li);
//     });
// }


// // ===============================
// // UPDATE / EDIT TODO
// // ===============================

// function editTodo(id) {

//     const todo = todos.find(function(todo) {
//         return todo.id === id;
//     });

//     if (!todo) {
//         return;
//     }

//     const newTask = prompt("Edit your task:", todo.task);

//     if (newTask === null) {
//         return;
//     }

//     const updatedTask = newTask.trim();

//     if (updatedTask === "") {
//         alert("Task cannot be empty.");
//         return;
//     }

//     todo.task = updatedTask;

//     displayTodos();
// }


// // ===============================
// // DELETE TODO
// // ===============================

// function deleteTodo(id) {

//     const confirmDelete = confirm("Are you sure you want to delete this task?");

//     if (!confirmDelete) {
//         return;
//     }

//     todos = todos.filter(function(todo) {
//         return todo.id !== id;
//     });

//     displayTodos();
// }


// // ===============================
// // INITIAL DISPLAY
// // ===============================

// displayTodos();

const API_URL = "http://localhost:8080/todos";


// ===============================
// ADD TODO
// ===============================

async function addTodo() {

    const input = document.getElementById("todoInput");

    const task = input.value.trim();

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    const todo = {
        task: task,
        completed: false
    };

    try {

        const response = await fetch(API_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(todo)
        });

        if (!response.ok) {
            throw new Error("Failed to add todo");
        }

        input.value = "";

        loadTodos();

    } catch (error) {

        console.error(error);

        alert("Could not connect to the backend.");
    }
}


// ===============================
// VIEW TODOS
// ===============================

async function loadTodos() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load todos");
        }

        const todos = await response.json();

        displayTodos(todos);

    } catch (error) {

        console.error(error);

        alert("Could not connect to the backend.");
    }
}


// ===============================
// DISPLAY TODOS
// ===============================

function displayTodos(todos) {

    const todoList = document.getElementById("todoList");

    todoList.innerHTML = "";

    todos.forEach(function(todo) {

        const li = document.createElement("li");

        li.className = "todo-item";


        const span = document.createElement("span");

        span.className = "todo-text";

        span.textContent = todo.task;

        if (todo.completed) {
            span.classList.add("completed");
        }


        // Button container
        const buttonGroup = document.createElement("div");

        buttonGroup.className = "button-group";


        // Edit button
        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className = "edit-button";

        editButton.onclick = function() {

            editTodo(todo.id);

        };


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-button";

        deleteButton.onclick = function() {

            deleteTodo(todo.id);

        };


        buttonGroup.appendChild(editButton);

        buttonGroup.appendChild(deleteButton);

        li.appendChild(span);

        li.appendChild(buttonGroup);

        todoList.appendChild(li);
    });
}


// ===============================
// UPDATE TODO
// ===============================

async function editTodo(id) {

    const newTask = prompt("Edit your task:");

    if (newTask === null) {
        return;
    }

    const updatedTask = newTask.trim();

    if (updatedTask === "") {

        alert("Task cannot be empty.");

        return;
    }


    const todo = {
        task: updatedTask,
        completed: false
    };


    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(todo)

        });


        if (!response.ok) {
            throw new Error("Failed to update todo");
        }

        loadTodos();

    } catch (error) {

        console.error(error);

        alert("Could not update the task.");
    }
}


// ===============================
// DELETE TODO
// ===============================

async function deleteTodo(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(`${API_URL}/${id}`, {

                method: "DELETE"

            });


        if (!response.ok) {
            throw new Error("Failed to delete todo");
        }

        loadTodos();

    } catch (error) {

        console.error(error);

        alert("Could not delete the task.");
    }
}


// ===============================
// INITIAL LOAD
// ===============================

loadTodos();