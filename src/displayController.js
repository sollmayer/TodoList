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

