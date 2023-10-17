import { currentSection, displayCurrentSection } from "./displayController";
import { addTaskToProject, deleteTaskFromProject, updateProjectTaskList } from "./project";
export class Task {
    constructor(title, description, dueDate,priority, project){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.important = false;
        this.completed = false;
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
    taskList = getTasks();
    taskList.push(newTask);
    
    addTaskToProject(currentSection, newTask)
    
    localStorage.setItem("TaskList", JSON.stringify(taskList));
    return {title, description, dueDate,priority, important:false, completed:false}
}

const getProjectForTask = () => {
    console.log('CurrentSectionForTask: ', currentSection);
    return currentSection;
}

export const deleteTask = (taskTitle) => {
    console.log('deleteTask',taskTitle);
    const {project: taskProject} = getTasks().filter(task => task.title === taskTitle)[0];
    taskList = getTasks().filter(task => task.title !== taskTitle);
    
    document.querySelector('.taskList').removeChild(document.querySelector(`.task-${taskTitle.replaceAll(' ','')}`))
    if(taskProject != "All Tasks") {
        console.log("taskProject",taskProject)
        deleteTaskFromProject(taskProject,taskTitle)
    };
    
    localStorage.setItem("TaskList", JSON.stringify(taskList));
    // displayCurrentSection(currentSection);
}


export const updateTaskStatus = (taskTitle, field, value,projectFunc) => {
    console.log('updateTaskStatus value: ', value);
    let tasks = getTasks().map(task => {
        if(task.title == taskTitle) {
            task[field] = value;
            projectFunc(task.project, taskTitle, field, value);
        }
        return task;
    })
    localStorage.setItem("TaskList", JSON.stringify(tasks));
}
