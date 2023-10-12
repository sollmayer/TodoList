import { getProjects, displayProjectTasks } from "./project";
import { addProjectToPage, addTaskToPage } from "./domController";
import { getTasks } from "./task";

export const displayProjects = () => {
    const projects = getProjects();
    console.log("projects",projects)
    projects.forEach(project => {
        // console.log(project);
        document.querySelector('.projectList').appendChild(addProjectToPage(project))
    })
    // document.querySelector('.projectList').appendChild(projects)
}
export const displayTasks = () => {
    const tasks = getTasks();
    console.log("tasks",tasks)
    tasks.forEach(task => {
        document.querySelector('.taskList').appendChild(addTaskToPage(task))
    })
}

export let currentSection = "All Tasks";
export const displayCurrentSection = (className) => {
    const selectedProject = getProjects().filter(project => project.title == className.split('-')[1])[0] || [];
    currentSection = selectedProject.title || "All Tasks";
    document.querySelector('#taskSection').textContent = `Current section: ${currentSection}`
    console.log("selectedProject", selectedProject)

    if(selectedProject.title) {
        displayProjectTasks(selectedProject);
    }else {
        // displayTasks();
    }
}
