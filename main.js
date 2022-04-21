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
let taskList = []

addButton.addEventListener("click", addTask)
console.log(taskInput)

function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let resultHTML = "";
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div class="done-area">
            <div class="task">
                <div class="task-done">${taskList[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                    <button onclick="delateTask('${taskList[i].id}')">Delate</button>
                </div>
            </div>
            </div>`;
        } else {
            resultHTML += `<div class="task">
                <div>${taskList[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                    <button onclick="delateTask('${taskList[i].id}')">Delate</button>
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
    render();
    console.log(taskList)
}

function delateTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id==id){
            taskList.splice(i, 1);
            break;
        }
    }
    render();
}

