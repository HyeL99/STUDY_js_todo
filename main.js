// 유저가 텍스트 값을 입력한다.
// + 버튼을 클릭하면 할 일 아이템이 추가된다.
// delate 버튼을 누르면 아이템이 삭제된다.
// check 버튼을 누르면 아이템이 완료되면서 텍스트에 밑줄이 생긴다.
//   1. check 버튼을 클릭하는 순간 false를 true로 바꾼다.
//   2. true가 되면 완료된 것으로 간주하고 밑줄이 생긴다.
//   3. false이면 미완료로 간주하고 밑줄을 삭제한다.
// not Done, Done 탭을 누르면, 언더바가 이동한다.
// not Done 탭에는 미완료 아이템만, Done 탭에는 완료된 아이템만 나타난다.
// 전체 탭을 누르면 다시 전체 아이템이 나타난다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-taps div");
let underLine = document.getElementById("under-line");
let taskList = [];
let filterList = [];
let mode = "all";

addButton.addEventListener("click", addTask);
/*
underLine.style.width = offsetWidth + "px";
underLine.style.left = offsetLeft + "px";
underLine.style.top = offsetTop + (e.target.offsetHeight - 4) + "px";
*/
for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function (event){filter(event);});
}
function enterkey(){
    if(window.event.keyCode == 13){addTask();}
}

function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    render();
    taskInput.value = "";
}

function render(){
    let list = [];
    if(mode == "all"){
        list = taskList;
    }else{
        list = filterList;
    }
    //console.log(list)

    let resultHTML = "";
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="done-area">
            <div class="task">
                <div class="task-done task-text">${list[i].taskContent}</div>
                <div class="task-button">
                    <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-right icon-repeat"></i></button>
                    <button onclick="delateTask('${list[i].id}')"><i class="fa-regular fa-trash-can icon-delate"></i></button>
                </div>
            </div>
            </div>`;
        } else {
            resultHTML += `<div class="task">
                <div class="task-text">${list[i].taskContent}</div>
                <div class="task-button">
                    <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check icon-check"></i></button>
                    <button onclick="delateTask('${list[i].id}')"><i class="fa-regular fa-trash-can icon-delate"></i></button>
                </div>
            </div>`;
        }
        
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 16);
}

function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id==id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function delateTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id==id){
            taskList.splice(i, 1);
            break;
        }
    }
    filter();
}
function filter(event){
    if(event){
        mode = event.target.id;
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
    }
    filterList = [];
    if(mode == "notDone"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
    }else if(mode == "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
    }
    render();
}

