import { displayProjects } from "./displayController";
import { clearProjectList } from "./domController";
export class Project {
    constructor(title){
        this.title = title;
        this.taskList = [];
    }
    
    // addTaskToProject = (task) => this.taskList.push(task);

}

export const createProject = (title) => {
    return new Project(title);
}

let projectList = [...JSON.parse(localStorage.getItem('ProjectList')) || []] ;

export const populateProjectList = (project) => {
    projectList.push(project)
    localStorage.setItem('ProjectList', JSON.stringify(projectList));
    // console.log(localStorage.getItem('ProjectList'));
}

export const getProjects = () => {
    return JSON.parse(localStorage.getItem('ProjectList')) || [];
}

export const deleteProject = (projectTitle) => {
    projectList = projectList.filter(project => project.title !== projectTitle);
    localStorage.setItem('ProjectList', JSON.stringify(projectList));
    clearProjectList();
    displayProjects();
}

export const displayProjectTasks = (project) => {
    project.taskList.forEach(task => {
            // displayTask(task)
            console.log(task)
    })
}

export const addTaskToProject = (currentSection, task) => {
    projectList = projectList.map(project => {
        if(project.title === currentSection) {
            project.taskList.push(task);
        }
        return project;
    });
    localStorage.setItem('ProjectList', JSON.stringify(projectList));
}
