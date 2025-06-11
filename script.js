document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
  
    let tasks = JSON.parse(localStorage.getItem("maganattiTasks")) || [];
  
    function saveTasks() {
      localStorage.setItem("maganattiTasks", JSON.stringify(tasks));
    }
  
    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
  
        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        if (task.completed) {
          taskText.classList.add("completed");
        }
  
        taskText.addEventListener("click", () => {
          task.completed = !task.completed;
          saveTasks();
          renderTasks();
        });
  
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-sm btn-danger";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        };
  
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    }
  
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = "";
      }
    });
  
    renderTasks();
  });
  