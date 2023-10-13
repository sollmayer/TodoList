import { getProjects, displayProjectTasks } from "./project";
import { addProjectToPage, addTaskToPage } from "./domController";
import { getTasks } from "./task";

export let currentSection = "All Tasks";


export const displayProjects = () => {
    const projects = getProjects();
    console.log("projects",projects)
    projects.forEach(project => {
        document.querySelector('.projectList').appendChild(addProjectToPage(project))
    })
}
// adjust this function to displayProjectTasks
export const displayTasks = () => {
    const tasks = getTasks();
    console.log("Displaying tasks",tasks)
    tasks.forEach(task => {
        // if(task.important) document.querySelector('')
        document.querySelector('.taskList').appendChild(addTaskToPage(task))
    })
}


export const displayCurrentSection = (className) => {
    const selectedProject = getProjects().filter(project => project.title == className.split('-')[1])[0] || [];
    currentSection = selectedProject.title || "All Tasks";
    document.querySelector('#taskSection').textContent = `Current section: ${currentSection}`
    console.log("selectedProject", selectedProject)

    if(selectedProject.title) {
        displayProjectTasks(selectedProject);
    }else {
        displayTasks();
    }
}

export const displayImportant = () => {
    const tasks = getTasks();
    tasks.forEach(task => {
        if(task.important) {
            document.querySelector('.taskList').appendChild(addTaskToPage(task))
        }
    })
}