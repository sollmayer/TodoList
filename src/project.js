import { displayProjects, displayTasks } from "./displayController";
import { clearProjectList, addTaskToPage, appendTask } from "./domController";
import { deleteTask } from "./task";
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
    projectList.forEach(project => {
        if(project.title === projectTitle){
            project.taskList.forEach(task => {
                console.log('deleteTask',task.title)
                deleteTask(task.title)
            })
        }
    })
    projectList = projectList.filter(project => project.title !== projectTitle);
    localStorage.setItem('ProjectList', JSON.stringify(projectList));
    clearProjectList();
    displayProjects();
}

export const displayProjectTasks = (project) => {
    project.taskList.forEach(task => {
            // console.log(task)
            appendTask(addTaskToPage(task))
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

export const deleteTaskFromProject = (projectName, taskTitle) => {
    console.log('deleteTaskFromProject', projectName);
    projectList = projectList.map(project => {
        if(projectName == project.title){
            project.taskList = project.taskList.filter((task)=> task.title != taskTitle);
        }
        return project;
    });
    localStorage.setItem('ProjectList', JSON.stringify(projectList));
}

export const updateProjectTaskList = (projectName,taskTitle, field) => {
    projectList = projectList.map(project => {
        if(projectName === project.title){
            project.taskList.forEach(task => {
                if(taskTitle === task.title) task[field] = !task[field];
            })
        }
        return project;
    });
    localStorage.setItem('ProjectList', JSON.stringify(projectList));
}