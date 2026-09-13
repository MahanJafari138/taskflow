let clickGenerate = document.getElementById("clickGenerate");
let inputWork = document.getElementById("inputWork");
let inputCategory = document.getElementById("inputCategory");
let tasks = [];
let container = document.querySelector(".Task-container");
let progressInner = document.getElementById("progressInner");

clickGenerate.addEventListener("click", function () {
  let workValue = inputWork.value;
  let categoryValue = inputCategory.value;

  if (workValue === "" || categoryValue === "") {
    return alert("باید اول دوتا مقدار خواسته شده رو تکمیل کنی!");
  }
  tasks.push({
    name: workValue,
    category: categoryValue,
    done: false,
  });
  updateProgress();
  displayTasks();
  saveTasks();
});

function displayTasks() {
  container.innerHTML = "";

  let categories = [];

  tasks.forEach(function (task) {
    if (categories.includes(task.category) === false) {
      categories.push(task.category);
    }
  });

  categories.forEach(function (item) {
    let heading = document.createElement("h3");
    heading.textContent = item;
    heading.classList.add("task-titel");
    container.appendChild(heading);

    let rowContainer = document.createElement("div");
    rowContainer.classList.add("tasks-box-row");
    container.appendChild(rowContainer);

    let tasksInThisCategory = tasks.filter(function (task) {
      return task.category === item;
    });

    tasksInThisCategory.forEach(function (task, index) {
      let creatDiv = document.createElement("div");
      creatDiv.classList.add("task-box");
      rowContainer.appendChild(creatDiv);

      let rowText = document.createElement("div");
      rowText.textContent = task.name;
      creatDiv.appendChild(rowText);

      let inputCheckBox = document.createElement("input");
      inputCheckBox.type = "checkbox";
      rowText.appendChild(inputCheckBox);

      inputCheckBox.addEventListener("change", function () {
        if (inputCheckBox.checked) {
          task.done = true;
        } else {
          task.done = false;
        }
        updateProgress();
        saveTasks();
      });

      let x = document.createElement("button");
      x.classList.add("button-in-box");
      creatDiv.appendChild(x);

      let img = document.createElement("img");
      img.src = "assets/icon/Delete.png";
      img.classList.add("delete-icon-style");
      x.appendChild(img);

      x.addEventListener("click", function () {
        tasks = tasks.filter(function (t) {
          return t !== task;
        });
        updateProgress();
        saveTasks();
        displayTasks();
      });
    });
  });
}

function updateProgress() {
  let doneTasks = tasks.filter(function (task) {
    return task.done === true;
  });
  let percent = 0;
  if (tasks.length !== 0) {
    percent = (doneTasks.length / tasks.length) * 100;
  }
  progressInner.style.width = percent + "%";
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
}

loadTasks();
updateProgress();
displayTasks();
