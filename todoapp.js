const dateElement = document.getElementById("date");
const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("item");

// list

//clear 
function Reload(){
    localStorage.clear();
    location.reload();
}

//date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// list
// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;
let data=localStorage.getItem("TODO");

//check if data is not empty
if(data){
    LIST=JSON.parse(data);
    id=LIST.length;  //set the id for the last input
    loadList(LIST); //load the list from user interface
}
else{
    //if data isn't empty
    LIST=[];
    id=0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name,item.id,item.done,item.trash); 
    });
} 

function addToDo(toDo, id, done, trash){
if(trash){return;}
const DONE=done ? CHECK : UNCHECK;
const LINE= done ? LINE_THROUGH: "";

const item=`<li class="itemlist">

<i class="fa ${DONE} co" job="complete" id="${id}"></i>
<p class="text ${LINE}"> ${toDo} </p>
<i class="fa fa-trash-o de" job="delete" id="${id}"></i>
</li>
`;

const position="beforeend";

list.insertAdjacentHTML(position, item);
}

// add to do

let addToDoButton=document.getElementById("addItemButton");

addToDoButton.addEventListener("click",function(){
    
        const toDo=input.value;
    //if the input isn't empty

    if(toDo){
        addToDo(toDo, id, false, false);
        LIST.push({name: toDo,
        id: id,
        done: false,
        trash:false});
            
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
    }
    input.value="";
    input.focus();
})

//complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done=LIST[element.id].done ? false : true;
    
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
    input.focus();
}

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
    input.focus();
});






//add to-do
// let addToDoButton=document.getElementById("addItemButton");
// let toDoContainer=document.getElementById("list");
// let inputFiled=document.getElementById("item");

// addToDoButton.addEventListener("click", function(){
    
//     if(inputFiled.value === '')
//     {
//         alert('This field is required!');
//     }
//     else{
//     var paragraph=document.createElement('li')
//     paragraph.innerText=inputFiled.value;
//     toDoContainer.appendChild(paragraph);
    
//     inputFiled.value="";
//     }
//      inputFiled.focus(); //autofocus

    
//     //remove from to do list
//     paragraph.addEventListener("click", function(){
//         paragraph.style.textDecoration="line-through";
//     })
//     paragraph.addEventListener("dblclick", function(){
//         toDoContainer.removeChild(paragraph);
//     })
// })


