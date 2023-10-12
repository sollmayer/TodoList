import { currentSection } from "./displayController";
import { addTaskToProject, deleteTaskFromProject } from "./project";
export class Task {
    constructor(title, description, dueDate,priority, project){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }

    getTitle = () => {
        return this.title;
    }

    setTitle = (title) => {
        this.title = title;
    }
}

let taskList = [...JSON.parse(localStorage.getItem('TaskList')) || []] ;


export const createTask = (title, description, dueDate,priority, project) => {
    return new Task(title, description, dueDate,priority,project);
}

export const getTasks = () => {
    return JSON.parse(localStorage.getItem('TaskList')) || [];
}

export const addTask = () => {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#dueDate').value;
    const priority = document.querySelector('#priority').value;

    let newTask = createTask(title,description,dueDate,priority, getProjectForTask())
    taskList.push(newTask);
    localStorage.setItem("TaskList", JSON.stringify(taskList));
    addTaskToProject(currentSection, newTask)
    
    return {title, description, dueDate,priority}
}

const getProjectForTask = () => {
    console.log('CurrentSectionForTask: ', currentSection);
    return currentSection;
}

export const deleteTask = (taskTitle) => {
    console.log('deleteTask',taskTitle);
    const {project: taskProject} = taskList.filter(task => task.title === taskTitle)[0];

    taskList = taskList.filter(task => task.title !== taskTitle);
    localStorage.setItem("TaskList", JSON.stringify(taskList));
    
    document.querySelector('.taskList').removeChild(document.querySelector(`.task-${taskTitle}`))
    
    if(taskProject != "All Tasks") {
        console.log("taskProject",taskProject)
        deleteTaskFromProject(taskProject,taskTitle)
    };
}