  // Carrega as tarefas salvas do localStorage
  document.addEventListener("DOMContentLoaded", loadTasks);

  function loadTasks() {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      let taskList = document.getElementById("task-list");

      tasks.forEach(function(task) {
          addTaskToDOM(task.text, task.completed);
      });
  }

  function saveTasks() {
      let tasks = [];
      document.querySelectorAll(".task-list li").forEach(function(taskItem) {
          tasks.push({
              text: taskItem.querySelector(".task-text").textContent,
              completed: taskItem.classList.contains("completed")
          });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function addTask() {
      let taskInput = document.getElementById("new-task-input");
      let taskText = taskInput.value.trim();

      if (taskText) {
          addTaskToDOM(taskText, false);
          taskInput.value = "";
          saveTasks();
      }
  }