const form = document.querySelector('#form');
const input = document.querySelector('#new-todo');
const list = document.querySelector('#todoList');
const date = document.querySelector('#date');
let id = 0;
let completed, text, removed;

//set date

const options = {weekday: 'long', month: 'short', day: 'numeric'};
const today = new Date();


date.innerHTML = today.toLocaleDateString('en-US', options);

//listen for submit and create new task

const storageList = JSON.parse(localStorage.getItem("todos")) || [];
for(let i=0;i<storageList.length;i++){
  let newTodo = document.createElement('li');
  let removeBtn = document.createElement('button');
  removeBtn.classList.add('removeBtn');
  newTodo.insertAdjacentHTML('beforeend', storageList[i].task);
  newTodo.completed = storageList[i].completed ? true : false;
  newTodo.removed = storageList[i].removed ? true : false;
  if(newTodo.completed){
    newTodo.classList.toggle('line');
  }
  list.appendChild(newTodo);
  removeBtn.innerText = 'Remove';
  newTodo.append(removeBtn);
  removeBtn.addEventListener('click', function(e){
    e.target.parentNode.remove();
    for(let i=0;i<storageList.length;i++){
      if(storageList[i].task == e.target.parentNode.childNodes[0].nodeValue){
        if(!storageList[i].removed){
          storageList[i].removed = true;
        } else {
          storageList[i].removed = false;
        }
        localStorage.setItem('todos', JSON.stringify(storageList));
      }
    }
  })
  if(newTodo.removed){
    removeBtn.parentNode.remove();
  }
}

form.addEventListener('submit', function(e){
    e.preventDefault();
    if(input.value == ''){
      return;
    }
    let newTodo = document.createElement('li');
    let removeBtn = document.createElement('button');
    let text = input.value;
    removeBtn.classList.add('removeBtn');
    newTodo.insertAdjacentHTML('beforeend', text);
    newTodo.completed = false;
    newTodo.id = id;
    form.reset(); 
    list.appendChild(newTodo);
    removeBtn.innerText = 'Remove';
    newTodo.appendChild(removeBtn);
    removeBtn.addEventListener('click', function(e){
      e.target.parentNode.remove();
      for(let i=0;i<storageList.length;i++){
        if(storageList[i].task == e.target.parentNode.childNodes[0].nodeValue){
          if(!storageList[i].removed){
            storageList[i].removed = true;
          } else {
            storageList[i].removed = false;
          }
          localStorage.setItem('todos', JSON.stringify(storageList));
        }
      }
    })
    
    
    storageList.push({task: text, completed: false, removed: false});
    localStorage.setItem('todos', JSON.stringify(storageList));
});

list.addEventListener('click', function(e){
      let element = e.target;
      element.classList.toggle('line');

      for (let i=0;i<storageList.length;i++){
        if(storageList[i].task == element.childNodes[0].nodeValue){
          if(storageList[i].completed){
            storageList[i].completed = false;
          } else {
            storageList[i].completed = true;
          }
          localStorage.setItem('todos', JSON.stringify(storageList));
        }
      }
});

// function store(){

// }
// localStorage.setItem('todo', JSON.stringify(storageList));
//local storage code
//localStorage.setItem('todo', JSON.stringify(storageList));