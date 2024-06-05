document.addEventListener('DOMContentLoaded', (event) => {
    loadTasks();
    applyDarkMode();
});

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskDescription = document.getElementById("taskDescription");
    var taskDate = document.getElementById("taskDate");
    var taskPriority = document.getElementById("taskPriority");

    if (taskInput.value === "" || taskDescription.value === "" || taskDate.value === "") {
        alert("Please fill in all fields.");
        return;
    }

    var taskTable = document.getElementById("taskTable").getElementsByTagName('tbody')[0];
    var row = taskTable.insertRow(-1);
    var taskCell = row.insertCell(0);
    var descriptionCell = row.insertCell(1);
    var dateCell = row.insertCell(2);
    var priorityCell = row.insertCell(3);
    var completeCell = row.insertCell(4);
    var deleteCell = row.insertCell(5);

    taskCell.innerHTML = taskInput.value;
    descriptionCell.innerHTML = taskDescription.value;
    dateCell.innerHTML = taskDate.value;
    priorityCell.innerHTML = taskPriority.value.charAt(0).toUpperCase() + taskPriority.value.slice(1);

    var completeButton = document.createElement("input");
    completeButton.type = "checkbox";
    completeButton.className = "form-check-input";
    completeButton.onchange = function () {
        if (this.checked) {
            row.style.textDecoration = "line-through";
        } else {
            row.style.textDecoration = "none";
        }
        saveTasks();
    };
    completeCell.appendChild(completeButton);

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.onclick = function () {
        row.remove();
        saveTasks();
    };
    deleteCell.appendChild(deleteButton);

    taskInput.value = "";
    taskDescription.value = "";
    taskDate.value = "";
    taskPriority.value = "low";

    saveTasks();
}

function clearList() {
    var taskTable = document.getElementById("taskTable").getElementsByTagName('tbody')[0];
    while (taskTable.rows.length > 0) {
        taskTable.deleteRow(0);
    }
    saveTasks();
}

function searchTasks() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("taskTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function saveTasks() {
    var tasks = [];
    var taskTable = document.getElementById("taskTable").getElementsByTagName('tbody')[0];
    for (var i = 0; i < taskTable.rows.length; i++) {
        var row = taskTable.rows[i];
        var task = row.cells[0].innerText;
        var description = row.cells[1].innerText;
        var date = row.cells[2].innerText;
        var priority = row.cells[3].innerText;
        var completed = row.cells[4].getElementsByTagName('input')[0].checked;
        tasks.push({ task: task, description: description, date: date, priority: priority, completed: completed });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var taskTable = document.getElementById("taskTable").getElementsByTagName('tbody')[0];
    for (var i = 0; i < tasks.length; i++) {
        var row = taskTable.insertRow(-1);
        var taskCell = row.insertCell(0);
        var descriptionCell = row.insertCell(1);
        var dateCell = row.insertCell(2);
        var priorityCell = row.insertCell(3);
        var completeCell = row.insertCell(4);
        var deleteCell = row.insertCell(5);

        taskCell.innerHTML = tasks[i].task;
        descriptionCell.innerHTML = tasks[i].description;
        dateCell.innerHTML = tasks[i].date;
        priorityCell.innerHTML = tasks[i].priority;

        var completeButton = document.createElement("input");
        completeButton.type = "checkbox";
        completeButton.className = "form-check-input";
        completeButton.checked = tasks[i].completed;
        completeButton.onchange = function () {
            if (this.checked) {
                row.style.textDecoration = "line-through";
            } else {
                row.style.textDecoration = "none";
            }
            saveTasks();
        };
        completeCell.appendChild(completeButton);

        if (tasks[i].completed) {
            row.style.textDecoration = "line-through";
        }

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.onclick = function () {
            row.remove();
            saveTasks();
        };
        deleteCell.appendChild(deleteButton);
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
}

function applyDarkMode() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}
