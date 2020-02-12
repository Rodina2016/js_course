document.addEventListener('DOMContentLoaded', function () {
   'use strict';
    const toDoContainer = document.querySelector('#todo'),
    todoItem = document.querySelector('.todo-item'),
    todoButtons = document.querySelector('.todo-buttons'),
    todoCompletedContainer = document.querySelector('#completed'),
    add = document.querySelector('#add');

    const allItems = document.querySelectorAll('.todo-item');

    allItems[0].remove();
    allItems[1].remove();
   
    const toDoList = {
       list: [],
        pushLocalStorage: function(value, state, id) {
            const arr = this.getLocalStroge();
            if(arr) {
                arr.push({'id': id, 'title':value, 'done': state});
                this.list = arr;
            } else {
                this.list.push({'id': id, 'title':value, 'done': false});
            }

            localStorage.setItem('listToDo', JSON.stringify(this.list));
        },
        removeLocalStorage: function(id) {
            const arr = JSON.parse(localStorage.getItem("listToDo"));
            arr.forEach(function(item, ind) {
                if(item.id === +id) {
                    arr.splice(ind, 1);
                }
            });
            this.list = arr;
            localStorage.setItem('listToDo', JSON.stringify(arr));
        },
        getLocalStroge: function() {
            return JSON.parse(localStorage.getItem("listToDo"));
        },
        addToDo: function (value) {
           const allTodoItem = document.querySelectorAll('.todo-item');
           const arr = this.getLocalStroge();
           let nextId = 0;
    
           if(arr !== null) {
             nextId = this.getLocalStroge().length;
           } else {
             nextId = allTodoItem.length;
           }

           let newTodoItem = todoItem.cloneNode(true);
           let buttons = todoButtons.cloneNode(true);
           newTodoItem.innerHTML = value;
           newTodoItem.appendChild(buttons);
           newTodoItem.setAttribute('id', nextId);
           toDoContainer.append(newTodoItem);

           if(localStorage.getItem("listToDo")) {
                this.pushLocalStorage(value, false, nextId)
           } else {
                this.pushLocalStorage(value, false, nextId);
           }
    
       },
        removeToDo: function (elem) {
           elem.remove();
        },
        setStateLocalStorage: function(id, newState) {
            const arr = this.getLocalStroge();
            arr.forEach(function(item, ind) {
                if(item.id === +id) {
                    item.done = newState;
                }
            });
            this.list = arr;
            localStorage.setItem('listToDo', JSON.stringify(arr));
        },
        buildListToDo: function() {
            const buildArr = this.getLocalStroge();
            if(buildArr) {
                buildArr.forEach(function(item) {
                    let newTodoItem = todoItem.cloneNode(true);
                    let buttons = todoButtons.cloneNode(true);
          
                    newTodoItem.innerHTML = item.title;
                    newTodoItem.setAttribute('id', item.id);
                    newTodoItem.appendChild(buttons);
    
                    if(item.done) {
                        todoCompletedContainer.appendChild(newTodoItem);
                    } else if(!item.done) {
                        toDoContainer.appendChild(newTodoItem);
                    }
                });
            }
        },
    }

    add.addEventListener('click', function (event) {
        event.preventDefault();
        const inputValue = this.parentElement.querySelector('.header-input').value;
        toDoList.addToDo(inputValue);
        this.parentElement.querySelector('.header-input').value = '';
    });

    document.addEventListener('click', function(event){
        const classElem = event.target.className;

        if(classElem === 'todo-remove') {
            const currentId = event.target.parentElement.parentElement.getAttribute('id');
            const currentElem = event.target.parentElement.parentElement;

            toDoList.removeToDo(currentElem);
            toDoList.removeLocalStorage(currentId);
        }
        
        const container =  event.target.closest('ul');
 
        if(classElem === 'todo-complete' &&  container.getAttribute('id') === 'todo') {
            const currentElem = event.target.parentElement.parentElement;
            const currentId = currentElem.getAttribute('id');

            todoCompletedContainer.appendChild(currentElem);
            toDoList.setStateLocalStorage(currentId, true);
        } 

        if(classElem === 'todo-complete' &&  container.getAttribute('id') === 'completed') {
            const currentElem = event.target.parentElement.parentElement;
            const currentId = currentElem.getAttribute('id');

            toDoContainer.appendChild(currentElem);
            toDoList.setStateLocalStorage(currentId, false);
        }   
        
    });

    toDoList.buildListToDo();
});