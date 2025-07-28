const taskBox = document.querySelector('.tasksBox');
const addTaskInitialContainer = document.getElementById('addTaskInitialContainer');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

const typewriterClickSound = document.getElementById('typewriterClickSound');
const stampSound = document.getElementById('stampSound');

const playSound = (soundElement) => {
    soundElement.pause();
    soundElement.currentTime = 0;
    soundElement.play().catch(error => {
        console.warn("Audio playback prevented:", error);
    });
};


const checkAllTasksCompleted = () => {
    const tasks = taskList.querySelectorAll('li.task-item');
    let allHandled = true;

    if (tasks.length === 0){
        allHandled = false;
    }else{
        tasks.forEach(task => {
            if (!task.classList.contains('completed')&& !task.classList.contains('irrelevant')){
                allHandled = false;
            }
        });
    }
    if (allHandled && tasks.length>0){
        playSound(stampSound);
    }
}

document.addEventListener('DOMContentLoaded',() => {
    addTaskButton.addEventListener('click', () => {
        const inputContainer =document.createElement('div');
        inputContainer.classList.add('newTaskInputContainer');

        const newTaskInput = document.createElement('input');
        newTaskInput.type = 'text';
        newTaskInput.placeholder = 'Enter task name...';
        newTaskInput.classList.add('taskInputField');

        const confirmButton = document.createElement('button');
        confirmButton.textContent = '+';
        confirmButton.classList.add('addTask-button');

        inputContainer.appendChild(newTaskInput);
        inputContainer.appendChild(confirmButton);

        addTaskInitialContainer.replaceWith(inputContainer);

        newTaskInput.focus();

        confirmButton.addEventListener('click', () => {
            const taskText = newTaskInput.value.trim();

            if (taskText !== ""){
                const listItem =document.createElement('li');
                listItem.classList.add('task-item');

                const bujoDot = document.createElement('span');
                bujoDot.textContent = '.';
                bujoDot.classList.add('bujoDot');
                listItem.appendChild(bujoDot);

                const taskSpan = document.createElement('span');
                taskSpan.textContent = taskText;
                taskSpan.classList.add('taskText');
                listItem.appendChild(taskSpan);

                const bujoActions = document.createElement('div');
                bujoActions.classList.add('bujoActions');

                const completeButton = document.createElement('button');
                completeButton.textContent = '✓';
                completeButton.title = 'Mark as completed';
                completeButton.classList.add('bujoCompleteButton');
                completeButton.addEventListener('click', () => {
                    listItem.classList.toggle('completed');
                    listItem.classList.remove('irrelevant');
                    bujoDot.textContent = listItem.classList.contains('completed') ? '✓' : '•';
                    playSound(typewriterClickSound);
                    checkAllTasksCompleted();
                });

                const irrelevantButton = document.createElement('button');
                irrelevantButton.textContent = '─';
                irrelevantButton.title = 'Mark as irrelevant';
                irrelevantButton.classList.add('bujoIrrelevantButton');
                irrelevantButton.addEventListener('click', () => {
                    listItem.classList.toggle('irrelevant');
                    listItem.classList.remove('completed');
                    bujoDot.textContent = listItem.classList.contains('irrelevant') ? '─' : '•';
                    playSound(typewriterClickSound);
                    checkAllTasksCompleted();
                });
               
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '✗';
                deleteButton.title = 'Delete task';
                deleteButton.classList.add('bujoDeleteButton');
                deleteButton.addEventListener('click', () => {
                    listItem.remove();
                    playSound(typewriterClickSound);
                    checkAllTasksCompleted();
                });

                bujoActions.appendChild(completeButton);
                bujoActions.appendChild(irrelevantButton);
                bujoActions.appendChild(deleteButton);
                listItem.appendChild(bujoActions);

                taskList.appendChild(listItem);
                playSound(typewriterClickSound);

                newTaskInput.value = '';
                newTaskInput.focus();
                checkAllTasksCompleted();
            } else {
                alert('Got no tasks?');
            }
        });

        newTaskInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                confirmButton.click();
            }
        });
    });
    checkAllTasksCompleted();
})