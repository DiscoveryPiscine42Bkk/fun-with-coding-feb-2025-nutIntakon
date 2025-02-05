function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#ft_list div').forEach(task => {
        tasks.push(task.textContent);
    });
    document.cookie = "tasks=" + JSON.stringify(tasks) + "; path=/";
}

function loadTasks() {
    const cookies = document.cookie.split(';');
    let tasks = [];

    cookies.forEach(cookie => {
        if (cookie.trim().startsWith('tasks=')) {
            tasks = JSON.parse(cookie.trim().substring(7));
        }
    });

    tasks.forEach(task => {
        addTask(task);
    });
}

function addTask(taskText) {
    const taskDiv = document.createElement('div');
    taskDiv.textContent = taskText;
    taskDiv.style.cursor = 'pointer';
    
    taskDiv.onclick = function() {
        const confirmDelete = confirm("Do you want to delete this task?");
        if (confirmDelete) {
            taskDiv.remove();
            saveTasks();
        }
    };

    const taskList = document.getElementById('ft_list');
    taskList.insertBefore(taskDiv, taskList.firstChild);

    saveTasks();
}

document.getElementById('newTaskButton').addEventListener('click', () => {
    const newTaskText = prompt("Enter a new task:");
    if (newTaskText && newTaskText.trim() !== '') {
        addTask(newTaskText.trim());
    }
});

window.onload = loadTasks;
