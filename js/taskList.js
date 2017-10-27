const taskList = (function() {
    "use strict"
    
    const listElement = document.getElementsByClassName("tasks__list")[0];
    let taskItems = [];
    let newItemName = "";
    
    let dragTarget = null;
    let dragStart = 0;
    let elementStart = 0;

    (function fetchTasks () {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(response => {
                if(!response.ok)
                    throw Error(response.statusText);
                return response.json();
            })
            .then(data => {
                const tasks = data.slice(0, 10);
                for(let i=0; i<tasks.length; i++){
                    const listItem = getItemHTML(tasks[i].title);
                    taskItems.push(listItem);
                    listElement.appendChild(listItem);

                    const cascadeTime = 500; // ms
                    setTimeout(() => {
                        listItem.classList.remove("tasks__item--hidden");
                    }, Math.pow((i / (tasks.length-1)), 2) * cascadeTime)
                }
            })
            .catch(error => {
                // TODO(Olivier): Error handling
                console.log(error)
            });
    })();

    var dragEvents = (function() {
        function dragItem(event){
            if(!event.buttons || !dragTarget)
                return;
            const input = dragTarget.getElementsByClassName("tasks__input")[0];
            if(!input.disabled)
                return;
            const targetValue = (elementStart + (event.clientX - dragStart) / dragTarget.offsetWidth * 100);
            moveButtonsTo(dragTarget, targetValue, 0);
        }

        function moveButtonsTo(element, target, duration, timer = 0) {
            target = Math.max(Math.min(target, 100), -100)
            const input = element.getElementsByClassName("tasks__input")[0];
            const deleteButton = element.getElementsByClassName("tasks__button--delete")[0];
            const editButton = element.getElementsByClassName("tasks__button--edit")[0];
            if(timer === duration){
                input.style.marginLeft = target / 3 + "%";
                deleteButton.style.left = 100 + target + "%";
                editButton.style.right = 100 - target + "%";
                return;
            }
            const currentValue = parseFloat(input.style.marginLeft) * 3 | 0
            const newValue = ((currentValue - target) * 0.95 + target);
            setTimeout(() => {
                input.style.marginLeft = newValue / 3 + "%";
                deleteButton.style.left = 100 + newValue + "%";
                editButton.style.right = 100 - newValue + "%";
                moveButtonsTo(element, target, duration, ++timer)
            }, 1);
        }
        
        function startDrag(event) {
            if(!event.target.classList.contains("tasks__input") || !event.target.disabled)
                return;
            dragStart = event.clientX;
            dragTarget = event.target.parentElement.parentElement.parentElement;
            elementStart = parseInt(event.target.style.marginLeft) * 3 | 0;
        }

        function stopDrag(event){
            if(!dragTarget)
                return;
            const dragValue = (elementStart + (event.clientX - dragStart) / dragTarget.offsetWidth * 100);
            const returnValue = dragValue > 25 ? 25 :
                                dragValue < -25 ? -25 :
                                0;
            moveButtonsTo(dragTarget, returnValue, 50);
            dragTarget = null;
        }
    
        document.body.addEventListener("mousemove", dragItem);
        document.body.addEventListener("mousedown", startDrag);
        document.body.addEventListener("mouseup", stopDrag);

        return {
            moveButtonsTo
        }
    })();

    function getItemHTML(text){
        // NOTE(Olivier): Generating HTML:
        /* 
            <li class="tasks__item">
                <div class="tasks__background"></div>
                <form>
                    <button class="tasks__edit-button">Edit</button>
                    <input disabled value="item1" class="tasks__input"/>
                    <button class="tasks__delete-button">Delete</button>
                </form>
            </li>
        */

        const HTML = document.createElement("li");
        HTML.classList.add("tasks__item");
        HTML.classList.add("tasks__item--hidden");
        
        const background = document.createElement("div");
        background.className = "tasks__background";

        const form = document.createElement("form");
        form.style.overflow = "hidden"
        form.onSubmit = false;

        const editButton = document.createElement("button");
        editButton.classList.add("tasks__button");
        editButton.classList.add("tasks__button--edit");
        editButton.innerHTML = "Edit";

        const taskInput = document.createElement("div");
        const inputContent = document.createElement("input");
        inputContent.className = "tasks__input";
        inputContent.disabled = true;
        inputContent.value = text;
        taskInput.appendChild(inputContent);
        
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("tasks__button");
        deleteButton.classList.add("tasks__button--delete");
        deleteButton.innerHTML = "Delete";
        deleteButton.tabIndex = -1;

        form.appendChild(editButton);
        form.appendChild(taskInput);
        form.appendChild(deleteButton);
        HTML.appendChild(background);
        HTML.appendChild(form);

        // NOTE(Olivier): Event listeners for checking, updating and deleting items
        taskInput.addEventListener('click', toggleComplete);
        editButton.addEventListener('click', enableEditTask);
        editButton.addEventListener('focus', enableEditTask);
        deleteButton.addEventListener('click', deleteTask);
        inputContent.addEventListener('blur', updateTask);
        inputContent.addEventListener('submit', updateTask);
        inputContent.addEventListener('keyup', (e) => e.keyCode === 13 && updateTask(e));

        return HTML;
    }

    function toggleComplete(event){
        const task = event.target.parentElement.parentElement.parentElement;
        const background = task.getElementsByClassName("tasks__background")[0];
        const input = task.getElementsByClassName("tasks__input")[0];
        if(!input.disabled || Math.abs(event.clientX - dragStart) > 5)
            return;
            
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const elementX = task.getBoundingClientRect().left;
        const elementY = task.getBoundingClientRect().top;
        background.style.left = mouseX - elementX + "px";
        background.style.top = mouseY - elementY + "px";
        
        task.classList.toggle("tasks__item--completed");
        background.classList.toggle("tasks__background--completed");
        // TODO(Olivier): Update task in database
    }

    function enableEditTask(event){
        event.preventDefault();
        const task = event.target.parentElement.parentElement;
        if(task.classList.contains("tasks__item--hidden")){
            const next = task.nextSibling;
            task.getElementsByClassName("tasks__edit-button")[0].blur();

            return next ? next.getElementsByClassName("tasks__edit-button")[0].focus() : null;
        }
        const background = task.getElementsByClassName("tasks__background")[0];
        const input = task.getElementsByClassName("tasks__input")[0];
        input.disabled = false;
        background.classList.remove("tasks__background--completed");
        task.classList.remove("tasks__item--completed");
        input.focus();
        input.select();
        dragEvents.moveButtonsTo(task, 0, 50);
    }

    function deleteTask(event){
        event.preventDefault();
        const task = event.target.parentElement.parentElement;
        task.classList.add("tasks__item--hidden");
        setTimeout(() => {
            taskItems = taskItems.filter(item => item !== task);
            // TODO(Olivier): delete task item from database
        }, 200)
    }

    function updateTask(event){
        event.preventDefault();
        const task = event.target.parentElement.parentElement;
        const input = task.getElementsByClassName("tasks__input")[0];
        input.blur();
        input.disabled = true;
        // TODO(Olivier): put updated task into database
    }

    var searchTasks = function(str = "") {
        const searchString = str.toLowerCase();
        for(let i=0; i<taskItems.length; i++){
            const task = taskItems[i];
            const match = task  .getElementsByClassName("tasks__input")[0]
                                .value
                                .substr(0, searchString.length)
                                .toLowerCase() == searchString;

            match ? task.classList.remove("tasks__item--hidden") : 
                    task.classList.add("tasks__item--hidden");
        };
    }

    var addTask = function(formElement) {
        if(newItemName === "")
            return;
        const listItem = getItemHTML(newItemName);
        taskItems.push(listItem);
        listElement.appendChild(listItem);
        setTimeout(() => {
            listItem.classList.remove("tasks__item--hidden")
        }, 0);
        newItemName = "";
        formElement.getElementsByClassName("tasks__add")[0].value = "";
    }

    var updateNewItemName = function(str = ""){
        newItemName = str;
    }

    return {
        searchTasks,
        addTask,
        updateNewItemName
    }
})()