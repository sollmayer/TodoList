import { createTask, addTask, deleteTask, toggleTaskImportant, toggleCompleteStatus, updateTaskStatus, editTask } from "./task";
import { createProject, populateProjectList, deleteProject, updateProjectTaskList, editProjectTaskList } from "./project";
import { displayProjects, displayCurrentSection, currentSection, displayTasks, displayImportant } from "./displayController";

const showTaskForm = document.querySelector('#showTaskForm');
const showProjectForm = document.querySelector('#showProjectForm');

const taskDialog = document.querySelector("#task_dialog");
const projectDialog = document.querySelector("#project_dialog");
const editTaskDialog = document.querySelector("#editTask_dialog");

const cancelTask = taskDialog.querySelector("#cancel_task");
const cancelEditTask = taskDialog.querySelector("#cancel_task");
const cancelProject = projectDialog.querySelector("#cancel_project");

const taskForm = document.querySelector('#task_form');
const projectForm = document.querySelector('#project_form');

const allTasksBtn = document.querySelector("#allTasks")
const importantTasksBtn = document.querySelector("#importantTasks")


export const addListeners = () => {
    showTaskForm.addEventListener('click', ()=>taskDialog.showModal())
    showProjectForm.addEventListener('click', ()=>projectDialog.showModal())

    cancelTask.addEventListener('click', (e)=> {
        e.preventDefault();
        taskDialog.close()
    })
    cancelEditTask.addEventListener('click', (e)=>{e.preventDefault(); editTaskDialog.close()})
    cancelProject.addEventListener('click', (e)=> {
        e.preventDefault();
        projectDialog.close()
    })
    
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
    
    allTasksBtn.addEventListener('click', () => displayCurrentSection("All Tasks"))

    importantTasksBtn.addEventListener('click', ()=> displayCurrentSection("Important"))
}
const saveProject = () => {
    const name = document.querySelector('#projectName').value
    const project = createProject(name);
    console.log('project', project);
    populateProjectList(project);

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
    const deleteProjectBtn = document.createElement('button');

    projectContainer.classList.add(`project-${title}`)
    projectName.textContent = title;
    deleteProjectBtn.textContent = "Delete";
    deleteProjectBtn.setAttribute("data-title", title)
    deleteProjectBtn.addEventListener('click', ()=>deleteProject(deleteProjectBtn.dataset.title))
    

    projectName.addEventListener('click', () => displayCurrentSection(title))
    projectContainer.appendChild(projectName);
    projectContainer.appendChild(deleteProjectBtn);

    return projectContainer;
}   


export const addTaskToPage = ({title, description, dueDate,priority,important,completed}) => {
    const taskContainer = document.createElement('div')
    const taskTitle = document.createElement('p');
    const taskDescription = document.createElement('p');
    const taskDueDate = document.createElement('p');
    const taskPriority = document.createElement('p');
    const importantBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const deleteTaskBtn = document.createElement('button');
    const completeCheckbox = document.createElement("input");
   
    completeCheckbox.setAttribute('type', 'checkbox');

    taskTitle.textContent = title;
    taskDescription.textContent = description;
    taskDueDate.textContent = dueDate;
    taskPriority.textContent = priority;

    
    // importantBtn section
    importantBtn.textContent = "Important";
    if(important) importantBtn.classList.toggle('importantYellow');

    let importantStatus = important;
    importantBtn.addEventListener('click', () => {
        importantBtn.classList.toggle('importantYellow');
        updateTaskStatus(title, 'important', !importantStatus, updateProjectTaskList)
        importantStatus = !importantStatus;
    })

    // editBtn section
    editBtn.textContent = "Edit";
    editBtn.addEventListener('click', ()=>{
        showEditForm(title,description,dueDate,priority);
    })
    
    // completeCheckbox section
    if(completed) {
        taskContainer.classList.toggle('completed');
        completeCheckbox.checked = true;
    }
    let completeStatus = completed;
    completeCheckbox.addEventListener('change', ()=> {
        taskContainer.classList.toggle('completed');
        updateTaskStatus(title, 'completed', !completeStatus, updateProjectTaskList)
        completeStatus = !completeStatus;
    })

    deleteTaskBtn.textContent = "Delete Task";
    deleteTaskBtn.addEventListener('click', () => deleteTask(title))

    taskContainer.appendChild(completeCheckbox);
    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(taskDescription);
    taskContainer.appendChild(taskDueDate);
    taskContainer.appendChild(taskPriority);
    taskContainer.appendChild(importantBtn);
    taskContainer.appendChild(editBtn);
    taskContainer.appendChild(deleteTaskBtn);
    
    taskContainer.classList.add(`task-${title}`)
    return taskContainer;
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
        for(const [key,value] of Object.entries(newValues)){
            if(value !== previousValues[key]){
                updateTaskStatus(title, key, value, updateProjectTaskList);
            }
        }
        editTaskDialog.close();
        // clearTaskList();
        console.log('showEditForm',currentSection);
        displayCurrentSection(currentSection);
    })
}        