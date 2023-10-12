import { createTask, addTask } from "./task";
import { createProject, populateProjectList, deleteProject } from "./project";
import { displayProjects, displayCurrentSection } from "./displayController";

const showTaskForm = document.querySelector('#showTaskForm');
const showProjectForm = document.querySelector('#showProjectForm');

const taskDialog = document.querySelector("#task_dialog");
const projectDialog = document.querySelector("#project_dialog");

const cancelTask = taskDialog.querySelector("#cancel_task");
const cancelProject = projectDialog.querySelector("#cancel_project");

const taskForm = document.querySelector('#task_form');
const projectForm = document.querySelector('#project_form');


let tasks = [];
let projectList = []

export const addListeners = () => {
    showTaskForm.addEventListener('click', ()=>taskDialog.showModal())
    showProjectForm.addEventListener('click', ()=>projectDialog.showModal())

    cancelTask.addEventListener('click', (e)=> {
        e.preventDefault();
        taskDialog.close()
    })
    cancelProject.addEventListener('click', (e)=> {
        e.preventDefault();
        projectDialog.close()
    })
    
    taskForm.addEventListener('submit', (e)=>{
        e.preventDefault();
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

    projectContainer.addEventListener('click', () => {
        clearTaskList();
        displayCurrentSection(projectContainer.classList.value);
    })
    // projectName.addEventListener('click', () => displayCurrentSection(projectContainer.classList.value))
    projectContainer.appendChild(projectName);
    projectContainer.appendChild(deleteProjectBtn);

    return projectContainer;
}   


export const addTaskToPage = ({title, description, dueDate,priority}) => {
    const taskContainer = document.createElement('div')
    const taskTitle = document.createElement('p');
    const taskDescription = document.createElement('p');
    const taskDueDate = document.createElement('p');
    const taskPriority = document.createElement('p');

    taskTitle.textContent = title;
    taskDescription.textContent = description;
    taskDueDate.textContent = dueDate;
    taskPriority.textContent = priority;

    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(taskDescription);
    taskContainer.appendChild(taskDueDate);
    taskContainer.appendChild(taskPriority);
    
    return taskContainer;
}

export const appendTask = (container) => {
    document.querySelector('.taskList').appendChild(container);
} 