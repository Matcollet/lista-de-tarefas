document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('inputField');

    inputField.addEventListener('focus', function() {
      if (this.value === 'Sua tarefa aqui...') {
        this.value = '';
        this.classList.add('active');
      }
      saveTasks();
    });

    inputField.addEventListener('blur', function() {
      if (this.value === '') {
        this.value = 'Sua tarefa aqui...';
        this.classList.remove('active');
      }
      saveTasks();
    });

    // Estado da minha aplicação
    const tarefas = ['Suas tarefas aparecerão aqui!!'];
    function addtarefa() {
      const input = document.getElementById('inputField');
      const tarefa = input.value.trim(); // Remove espaços em branco extras

      if (input.value === '' || input.value === 'Sua tarefa aqui...') {
        return; // Se o input estiver vazio ou com o texto padrão, não faz nada
        saveTasks();
      }

      tarefas.push(tarefa);
      render();
      input.value = '';
    }

    function render() {
      const ul = document.querySelector('ul');
      ul.innerHTML = '';

      tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        
        // Cria o texto da tarefa
        const taskText = document.createElement('span');
        taskText.innerText = tarefa;

        // Cria o botão de delete
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Erase';
        deleteButton.id = 'deletebtn'
        deleteButton.onclick = () => {
          deleteTask(index);
          saveTasks();
        };

        // Adiciona o texto e o botão ao item da lista
        li.appendChild(taskText);
        li.appendChild(deleteButton);
        ul.appendChild(li);
        saveTasks();
      });
    }

    function deleteTask(index) {
      tarefas.splice(index, 1); // Remove a tarefa do array
      render(); // Atualiza a lista de tarefas
    }

    function deletetarefa() {
      // Remove todas as tarefas
      tarefas.length = 0;
      render();
      saveTasks();
    }

    document.getElementById('meuBotao').addEventListener('click', addtarefa);

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        document.getElementById('meuBotao').click();
      }
      saveTasks();
    });

    // Iniciar
    render();
  });

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
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        addTaskToDOM(task.text, task.completed);
    });
}
document.addEventListener("DOMContentLoaded", loadTasks);

function addTaskToDOM(taskText, completed = false) {
    let taskList = document.getElementById("task-list");

    let li = document.createElement("li");
    li.className = completed ? "completed" : "";

    let span = document.createElement("span");
    span.className = "task-text";
    span.textContent = taskText;
    li.appendChild(span);
    saveTasks();
}
