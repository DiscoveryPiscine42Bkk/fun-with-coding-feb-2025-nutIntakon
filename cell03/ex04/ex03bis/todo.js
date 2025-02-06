$(document).ready(function() {

    function saveTasks() {
        let tasks = [];
        $('#ft_list div').each(function() {
            tasks.push($(this).text());
        });
        document.cookie = "tasks=" + JSON.stringify(tasks) + "; path=/";
    }

    function loadTasks() {
        const cookies = document.cookie.split(';');
        let tasks = [];

        cookies.forEach(function(cookie) {
            if (cookie.trim().startsWith('tasks=')) {
                tasks = JSON.parse(cookie.trim().substring(7));
            }
        });

        tasks.forEach(function(task) {
            addTask(task);
        });
    }

    function addTask(taskText) {
        const taskDiv = $('<div>').text(taskText).css('cursor', 'pointer');
        
        taskDiv.click(function() {
            const confirmDelete = confirm("Do you want to delete this task?");
            if (confirmDelete) {
                $(this).remove();
                saveTasks();
            }
        });

        $('#ft_list').prepend(taskDiv);
        saveTasks();
    }

    $('#newTaskButton').click(function() {
        const newTaskText = prompt("Enter a new task:");
        if (newTaskText && newTaskText.trim() !== '') {
            addTask(newTaskText.trim());
        }
    });

    loadTasks();

});