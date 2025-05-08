document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const tasksContainer = document.getElementById("tasks-container");
  const filterTabs = document.querySelectorAll(".filter-tab");
  const totalTasksEl = document.getElementById("total-tasks");
  const activeTasksEl = document.getElementById("active-tasks");
  const completedTasksEl = document.getElementById("completed-tasks");
  const toast = document.getElementById("toast");
  const themeToggle = document.getElementById("theme-toggle");
  const editModalOverlay = document.getElementById("edit-modal-overlay");
  const editTaskInput = document.getElementById("edit-task-input");
  const saveEditBtn = document.getElementById("save-edit");
  const cancelEditBtn = document.getElementById("cancel-edit");
  const closeModalBtn = document.getElementById("close-modal");

  // State
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let currentFilter = "all";
  let currentEditId = null;
  let deletedTask = null; // For undo functionality

  // Check saved theme
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }

  // Initialize
  renderTasks();
  updateStats();

  // Event listeners
  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      filterTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      currentFilter = this.dataset.filter;
      renderTasks();
    });
  });

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
      themeToggle.textContent = "☀️";
      localStorage.setItem("theme", "light");
    } else {
      themeToggle.textContent = "🌙";
      localStorage.setItem("theme", "dark");
    }
  });

  // Edit modal event listeners
  saveEditBtn.addEventListener("click", saveEdit);
  cancelEditBtn.addEventListener("click", closeEditModal);
  closeModalBtn.addEventListener("click", closeEditModal);

  editModalOverlay.addEventListener("click", function (e) {
    if (e.target === editModalOverlay) {
      closeEditModal();
    }
  });

  // Drag-and-drop event listeners
  tasksContainer.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("task")) {
      e.target.classList.add("dragging");
      e.dataTransfer.setData("text/plain", e.target.dataset.id);
    }
  });

  tasksContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingTask = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(tasksContainer, e.clientY);
    if (afterElement) {
      tasksContainer.insertBefore(draggingTask, afterElement);
    } else {
      tasksContainer.appendChild(draggingTask);
    }
  });

  tasksContainer.addEventListener("dragend", (e) => {
    if (e.target.classList.contains("task")) {
      e.target.classList.remove("dragging");
      updateTaskOrder();
    }
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeEditModal();
    }
  });

  // Functions
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks.unshift(newTask);
    saveTasks();
    taskInput.value = "";
    renderTasks();
    updateStats();
    showToast("Task added successfully!");
  }

  function toggleTaskStatus(id) {
    tasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    saveTasks();
    renderTasks();
    updateStats();
  }

  function deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) return;

    deletedTask = tasks.find((task) => task.id === id);
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
    updateStats();
    showToast('Task deleted. <button id="undo-delete">Undo</button>');

    const undoBtn = document.getElementById("undo-delete");
    undoBtn.addEventListener("click", () => {
      if (deletedTask) {
        tasks.unshift(deletedTask);
        saveTasks();
        renderTasks();
        updateStats();
        showToast("Task restored!");
        deletedTask = null;
      }
    });
  }

  function openEditModal(id) {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    currentEditId = id;
    editTaskInput.value = task.text;
    editModalOverlay.classList.add("show");
    setTimeout(() => {
      editTaskInput.focus();
    }, 300);
  }

  function closeEditModal() {
    editModalOverlay.classList.remove("show");
    currentEditId = null;
  }

  function saveEdit() {
    if (!currentEditId) return;

    const editedText = editTaskInput.value.trim();
    if (editedText === "") return;

    tasks = tasks.map((task) => {
      if (task.id === currentEditId) {
        return { ...task, text: editedText };
      }
      return task;
    });

    saveTasks();
    renderTasks();
    closeEditModal();
    showToast("Task updated successfully!");
  }

  function renderTasks() {
    let filteredTasks = tasks;

    if (currentFilter === "active") {
      filteredTasks = tasks.filter((task) => !task.completed);
    } else if (currentFilter === "completed") {
      filteredTasks = tasks.filter((task) => task.completed);
    }

    if (filteredTasks.length === 0) {
      tasksContainer.innerHTML = `
            <div class="empty-state">
              <h3>No tasks ${
                currentFilter !== "all" ? `(${currentFilter})` : ""
              }</h3>
              <p>${
                currentFilter === "all"
                  ? "Add your first task to get started!"
                  : currentFilter === "active"
                  ? "No active tasks. Great job!"
                  : "No completed tasks yet"
              }</p>
            </div>
          `;
      return;
    }

    tasksContainer.innerHTML = "";

    filteredTasks.forEach((task) => {
      const taskEl = document.createElement("div");
      taskEl.classList.add("task");
      taskEl.dataset.id = task.id;
      taskEl.draggable = true;

      if (task.completed) {
        taskEl.classList.add("completed");
      }

      const date = new Date(task.createdAt);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      taskEl.innerHTML = `
            <div class="task-check" data-id="${task.id}" aria-label="Toggle task completion"></div>
            <div class="task-text">${task.text}</div>
            <div class="task-date">${formattedDate}</div>
            <div class="task-actions">
              <button class="btn-icon btn-edit" data-id="${task.id}" aria-label="Edit task">✏️</button>
              <button class="btn-icon btn-delete" data-id="${task.id}" aria-label="Delete task">🗑️</button>
            </div>
          `;

      taskEl
        .querySelector(".task-check")
        .addEventListener("click", function () {
          const id = parseInt(this.dataset.id);
          toggleTaskStatus(id);
        });

      taskEl.querySelector(".btn-edit").addEventListener("click", function () {
        const id = parseInt(this.dataset.id);
        openEditModal(id);
      });

      taskEl
        .querySelector(".btn-delete")
        .addEventListener("click", function () {
          const id = parseInt(this.dataset.id);
          deleteTask(id);
        });

      tasksContainer.appendChild(taskEl);
    });
  }

  function updateStats() {
    const totalTasks = tasks.length;
    const completedTasksCount = tasks.filter((task) => task.completed).length;
    const activeTasksCount = totalTasks - completedTasksCount;

    totalTasksEl.textContent = totalTasks;
    activeTasksEl.textContent = activeTasksCount;
    completedTasksEl.textContent = completedTasksCount;
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function showToast(message) {
    toast.innerHTML = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  function getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll(".task:not(.dragging)"),
    ];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  function updateTaskOrder() {
    const newOrder = [...tasksContainer.children].map((taskEl) =>
      parseInt(taskEl.dataset.id)
    );
    tasks.sort((a, b) => newOrder.indexOf(a.id) - newOrder.indexOf(b.id));
    saveTasks();
  }
});

function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDuration = `${Math.random() * 5 + 3}s`;
    particle.style.animationDelay = `${Math.random() * 2}s`;
    particlesContainer.appendChild(particle);
  }
}

createParticles();
