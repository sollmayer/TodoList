export class Project {
    constructor(title){
        this.title = title;
        this.taskList = [];
    }
    
    addTaskToProject = (task) => {
        this.taskList.push(task);
    }

}

export const createProject = (title) => {
    return new Project(title);
}

const projectList = [...JSON.parse(localStorage.getItem('ProjectList')) || []] ;

export const populateProjectList = (project) => {
    projectList.push(project)
    localStorage.setItem('ProjectList', JSON.stringify(projectList));
    console.log(localStorage.getItem('ProjectList'));
}

export const getProjects = () => {
    return JSON.parse(localStorage.getItem('ProjectList')) || [];
}