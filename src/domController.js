import { addTask, deleteTask, updateTaskStatus } from "./task";
import { createProject, populateProjectList, deleteProject, updateProjectTaskList } from "./project";
import { displayProjects, displayCurrentSection, currentSection } from "./displayController";

const showTaskForm = document.querySelector('#showTaskForm');
const showProjectForm = document.querySelector('#showProjectForm');

const taskDialog = document.querySelector("#task_dialog");
const projectDialog = document.querySelector("#project_dialog");
const editTaskDialog = document.querySelector("#editTask_dialog");

const cancelTask = taskDialog.querySelectorAll("#cancel_task");
const cancelEditTask = editTaskDialog.querySelectorAll("#cancel_EditTask");
const cancelProject = projectDialog.querySelectorAll("#cancel_project");

const taskForm = document.querySelector('#task_form');
const projectForm = document.querySelector('#project_form');

const allTasksBtn = document.querySelector("#AllTasks")
const importantTasksBtn = document.querySelector("#Important")
const completedTasksBtn = document.querySelector("#Completed")
const todayTasksBtn = document.querySelector("#Today")
const thisWeekTasksBtn = document.querySelector("#ThisWeek")

// const sortBtn = document.querySelector('.sortBtn');
// const sortOptions = document.querySelectorAll('.sortValues p')

export const addListeners = () => {
    showTaskForm.addEventListener('click', ()=>taskDialog.showModal())
    showProjectForm.addEventListener('click', ()=>projectDialog.showModal())

    cancelTask.forEach(btn => btn.addEventListener('click', (e)=> {
        e.preventDefault();
        taskDialog.close()
    }))
    cancelEditTask.forEach(btn => btn.addEventListener('click', (e)=>{e.preventDefault(); editTaskDialog.close()}))
    cancelProject.forEach(btn => btn.addEventListener('click', (e)=> {
        e.preventDefault();
        projectDialog.close()
    }))
    
    taskForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        // clearTaskList();
        document.querySelector('.taskList').appendChild(addTaskToPage(addTask()));
        taskDialog.close();
    })

    projectForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        // document.querySelector('.projectList').appendChild(addProjectToPage());
        saveProject();
        clearProjectList();
        displayProjects();
        projectDialog.close();
    })
    
    allTasksBtn.addEventListener('click', (e) => displayCurrentSection("All Tasks",e.target))
    importantTasksBtn.addEventListener('click', (e) => displayCurrentSection("Important",e.target))
    completedTasksBtn.addEventListener('click', (e) => displayCurrentSection("Completed",e.target))
    todayTasksBtn.addEventListener('click', (e) => displayCurrentSection("Today",e.target))
    thisWeekTasksBtn.addEventListener('click', (e) => displayCurrentSection("This Week",e.target))
    // sortBtn.addEventListener('click', ()=> document.querySelector('.sortValues').classList.toggle('show'))
    // sortOptions.forEach(option => option.addEventListener('click', () => sortTask(option.value)))
    
}
const saveProject = () => {
    const name = document.querySelector('#projectName').value
    const project = createProject(name);
    console.log('project', project);
    populateProjectList(project);

}
export const resetSelection = () => {
    document.querySelectorAll('.selected').forEach(section => section.classList.remove('selected'));
}
export const clearProjectList = () => {
    document.querySelector('.projectList').textContent = "";
}
export const clearTaskList = () => {
    document.querySelector('.taskList').textContent = "";
}

export const addProjectToPage = ({title}) => {
    const projectContainer = document.createElement('div');
    const projectName = document.createElement('p');
    const projectIcon = document.createElement('img');
    const deleteProjectBtn = document.createElement('img');

    projectContainer.classList.add(`project-${title.replaceAll(' ','')}`)
    projectName.textContent = title;
    projectIcon.src = 'icons/reorder-horizontal.svg';
    deleteProjectBtn.src = 'icons/delete-icon.svg';
    projectIcon.classList.add('projectIcon')
    deleteProjectBtn.classList.add('deleteProjectBtn')
    deleteProjectBtn.setAttribute("data-title", title)
    deleteProjectBtn.addEventListener('click', ()=>deleteProject(deleteProjectBtn.dataset.title))
    

    projectName.addEventListener('click', (e) => displayCurrentSection(title,e.target.parentElement))
    // projectContainer.appendChild(projectIcon);
    projectContainer.appendChild(projectName);
    projectContainer.appendChild(deleteProjectBtn);

    return projectContainer;
}   


export const addTaskToPage = ({title, description, dueDate,priority,important,completed}) => {
    const mainContainer = document.createElement('div')
    const taskContainer = document.createElement('div')
    const detailsContainer = document.createElement('div')
    const taskTitle = document.createElement('p');
    const taskTitleDetails = document.createElement('p');
    const taskDescription = document.createElement('p');
    const taskDueDate = document.createElement('p');
    const taskDueDateDetails = document.createElement('p');
    const taskPriority = document.createElement('p');
    const importantBtn = document.createElement('img');
    const editBtn = document.createElement('img');
    const deleteTaskBtn = document.createElement('img');
    const completeCheckbox = document.createElement("input");
   
    completeCheckbox.setAttribute('type', 'checkbox');

    taskTitle.textContent = title;
    taskDueDate.textContent = dueDate;
    taskDueDate.classList.add('dueDateMainContent')
    taskTitleDetails.insertAdjacentHTML('afterbegin', `<span class="detailsHeading">Title: </span><span>${title}</span>`);
    taskDescription.insertAdjacentHTML('afterbegin', `<span class="detailsHeading">Description: </span><span>${description}</span>`);
    taskDueDateDetails.insertAdjacentHTML('afterbegin', `<span class="detailsHeading">Due Date: </span><span>${dueDate}</span>`);
    taskPriority.insertAdjacentHTML('afterbegin', `<span class="detailsHeading">Priority: </span><span>${priority}</span>`);
    
    //Show details
    taskTitle.addEventListener('click', ()=> detailsContainer.classList.toggle('show'))
    
    // importantBtn section
    importantBtn.src = 'icons/star.svg';
    importantBtn.classList.add('importantTaskBtn');
    if(important) importantBtn.classList.toggle('importantYellow');

    let importantStatus = important;
    importantBtn.addEventListener('click', () => {
        importantBtn.classList.toggle('importantYellow');
        updateTaskStatus(title, 'important', !importantStatus, updateProjectTaskList)
        importantStatus = !importantStatus;
    })

    // editBtn section
    editBtn.src = 'icons/pencil.svg';
    editBtn.classList.add('editTaskBtn');
    editBtn.addEventListener('click', ()=>{
        showEditForm(title,description,dueDate,priority);
    })
    
    // completeCheckbox section
    if(completed) {
        mainContainer.classList.toggle('completed');
        completeCheckbox.checked = true;
    }
    let completeStatus = completed;
    completeCheckbox.addEventListener('change', ()=> {
        mainContainer.classList.toggle('completed');
        updateTaskStatus(title, 'completed', !completeStatus, updateProjectTaskList)
        completeStatus = !completeStatus;
    })

    deleteTaskBtn.src = 'icons/delete-icon.svg';
    deleteTaskBtn.classList.add('deleteTaskBtn');
    deleteTaskBtn.addEventListener('click', () => deleteTask(title))

    // taskContainer.appendChild(completeCheckbox);
    const completeTitleDiv = document.createElement('div');
    completeTitleDiv.append(completeCheckbox,taskTitle);
    
    taskContainer.classList.add('mainTaskContent');
    taskContainer.append(completeTitleDiv)
    // taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(taskDueDate);
    taskContainer.appendChild(importantBtn);
    taskContainer.appendChild(editBtn);
    taskContainer.appendChild(deleteTaskBtn);
    detailsContainer.appendChild(taskTitleDetails);
    detailsContainer.appendChild(taskDescription);
    detailsContainer.appendChild(taskDueDateDetails);
    detailsContainer.appendChild(taskPriority);

    
    mainContainer.appendChild(taskContainer)
    mainContainer.appendChild(detailsContainer)
    mainContainer.classList.add(`task-${title.replaceAll(' ','')}`)
    detailsContainer.classList.add('collapse');
    return mainContainer;
}

export const appendTask = (container) => {
    document.querySelector('.taskList').appendChild(container);
} 

const showEditForm = (title,description,dueDate,priority) => {
    let previousValues = {title,description,dueDate,priority}
    editTaskDialog.showModal();
    document.querySelector('#editTitle').value = title;
    document.querySelector('#editDescription').value = description;
    document.querySelector('#editDueDate').value = dueDate;
    document.querySelector('#editPriority').value = priority;
    editTaskDialog.addEventListener('submit', (e)=>{
        e.preventDefault();
        let newValues = {
            'title': document.querySelector('#editTitle').value,
            'description': document.querySelector('#editDescription').value,
            'dueDate': document.querySelector('#editDueDate').value,
            'priority': document.querySelector('#editPriority').value
        }
        console.log(newValues);
        let taskTitle = title;
        for(const [key,value] of Object.entries(newValues)){
            if(value != previousValues[key]){
                console.log('key|value')
                console.log({key,value});
                updateTaskStatus(taskTitle, key, value, updateProjectTaskList);
                taskTitle = newValues.title;
            }
        }
        editTaskDialog.close();
        // clearTaskList();
        console.log(currentSection.replaceAll(' ',""))
        displayCurrentSection(currentSection, document.querySelector(`#${currentSection.replaceAll(' ',"")}`) ?? document.querySelector(`.project-${currentSection.replaceAll(' ','')}`));
    })
}

// export const addStyleToSelectedSection = () => {
//     resetSelection();
//     let selected = document.querySelector(`.${currentSection}`) ?? document.querySelector(`.project-${currentSection}`)
//     selected.classList.add(selected)
// }