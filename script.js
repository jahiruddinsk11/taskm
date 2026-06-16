let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask(){

let input = document.getElementById("taskInput");

if(input.value.trim() === ""){
alert("Enter a task");
return;
}

tasks.push({
text: input.value,
completed: false
});

saveData();
input.value="";
}

function displayTasks(){

let taskList=document.getElementById("taskList");

taskList.innerHTML="";

tasks.forEach((task,index)=>{

let li=document.createElement("li");

li.innerHTML=`
<span class="${task.completed ? 'completed' : ''}">
${task.text}
</span>

<div class="actions">

<button onclick="toggleTask(${index})">
✓
</button>

<button onclick="deleteTask(${index})">
🗑
</button>

</div>
`;

taskList.appendChild(li);

});

updateStats();
}

function toggleTask(index){

tasks[index].completed=
!tasks[index].completed;

saveData();
}

function deleteTask(index){

tasks.splice(index,1);

saveData();
}

function saveData(){

localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);

displayTasks();
}

function updateStats(){

document.getElementById("total").textContent=
tasks.length;

document.getElementById("completed").textContent=
tasks.filter(t=>t.completed).length;
}

function searchTask(){

let search=
document.getElementById("search")
.value.toLowerCase();

let items=
document.querySelectorAll("#taskList li");

items.forEach(item=>{

let text=
item.innerText.toLowerCase();

item.style.display=
text.includes(search)
? "flex"
: "none";

});
}