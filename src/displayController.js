import { getProjects, displayProjectTasks } from "./project";
import { addProjectToPage, addTaskToPage, clearTaskList, resetSelection } from "./domController";
import { getTasks } from "./task";

import { differenceInCalendarDays, formatDistanceToNow,isToday,parseISO, isThisWeek } from "date-fns";

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


export const displayCurrentSection = (currentTitle, section) => {
    clearTaskList();
    
    resetSelection();
    section.classList.add('selected');

    const selectedProject = getProjects().filter(project => project.title == currentTitle)[0] || [];
    currentSection = selectedProject.title || currentTitle;
    document.querySelector('#taskSection').textContent = `Current section: ${currentSection}`

    if(selectedProject.title) {
        displayProjectTasks(selectedProject);
    }else {
        displayTasks();
    }
}

export const displayTasks = () => {
    let tasks = getTasks();
    // console.log("Displaying tasks",tasks)

    if(currentSection == "Important Tasks") tasks = tasks.filter(task => task.important)
    else if(currentSection == "Completed Tasks") tasks = tasks.filter(task => task.completed)
    else if(currentSection == "Today") tasks = tasks.filter(task => isToday(parseISO(task.dueDate)))
    else if(currentSection == "This Week") tasks = tasks.filter(task => isThisWeek(parseISO(task.dueDate)))

    tasks.forEach(task => document.querySelector('.taskList').appendChild(addTaskToPage(task)))
}
export const displayImportant = () => {
    const tasks = getTasks();
    tasks.forEach(task => {
        if(task.important) {
            document.querySelector('.taskList').appendChild(addTaskToPage(task))
        }
    })
}