import { getProjects, displayProjectTasks } from "./project";
import { addProjectToPage, addTaskToPage, clearTaskList } from "./domController";
import { getTasks } from "./task";

export let currentSection = "All Tasks";


export const displayProjects = () => {
    const projects = getProjects();
    console.log("projects",projects)
    projects.forEach(project => {
        document.querySelector('.projectList').appendChild(addProjectToPage(project))
    })
}
// export const displayTasks = () => {
//     const tasks = getTasks();
//     console.log("Displaying tasks",tasks)
//     tasks.forEach(task => {
//         // if(task.important) document.querySelector('')
//         document.querySelector('.taskList').appendChild(addTaskToPage(task))
//     })
// }


export const displayCurrentSection = (currentTitle) => {
    clearTaskList();
    
    const selectedProject = getProjects().filter(project => project.title == currentTitle)[0] || [];
    console.log('displayCurrentSection',selectedProject)
    currentSection = selectedProject.title || currentTitle;
    document.querySelector('#taskSection').textContent = `Current section: ${currentSection}`
    console.log("selectedProject", selectedProject)

    if(selectedProject.title) {
        displayProjectTasks(selectedProject);
    }else {
        displayTasks();
    }
}

export const displayTasks = () => {
    
    let tasks = getTasks();
    console.log("Displaying tasks",tasks)
    if(currentSection == "Important") {
        tasks = tasks.filter(task => task.important)
    }
    console.log(tasks)
    tasks.forEach(task => {
        
        document.querySelector('.taskList').appendChild(addTaskToPage(task))
    })
}
export const displayImportant = () => {
    const tasks = getTasks();
    tasks.forEach(task => {
        if(task.important) {
            document.querySelector('.taskList').appendChild(addTaskToPage(task))
        }
    })
}