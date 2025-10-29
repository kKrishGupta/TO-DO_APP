const task = document.querySelector("#taskInput");
const addBtn = document.querySelector("addBtn");
const taskList = document.querySelector("taskList");
const clearAll = document.querySelector("clearAll");

// load tasks from local storage
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click" , addTask);
clearAll.addEventListener("click",clearAllTask);

function addTask(){
  const taskText =task.value.trim();
  if(taskText ==="") return alert("Please enter a task!!...");
  const li  = createTaskElement(taskText);
  taskText.appendChild(li);
  saveTasks();

  taskInput.value = "";
};

function createTaskElement(text){
  const li = document.createElement("li");
  li.textContent = text;
  li.addEventListener("click", () =>{
    li.classList.toggle("completed");
    saveTasks();
  });
   
  const span = document.createElement("span");
  span.textContent = "❌";
  span.addEventListener("click" , (e) =>{
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  return li;
}

function saveTasks(){
  const tasks = [];
  document.querySelectorAll("li").forEach((li)=>{
    tasks.push({
      text :li.firstChild.textContent,
      completed : li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON>stringify(tasks));
}

function loadTasks(){
  const storedTasks = JSON.parse(localStorage.getItem("tasks"))||[];
  storedTasks.forEach((task) =>{
    const li = createTaskElement(task.text);
    if(task.completed) li.classList.add("completed");
    taskList.appendChild(li);
  });
}
function clearAll(){
  if(confirm("Are you sure you want to clear all tasks?")){
    taskList.innerHTML ="";
    localStorage.removeItem("tasks"); 
  }
}