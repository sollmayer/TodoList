import { getProjects } from "./project";
import { addProjectToPage } from "./domController";


export const displayProjects = () => {
    const projects = getProjects();
    console.log("projects",projects)
    projects.forEach(project => {
        // console.log(project);
        document.querySelector('.projectList').appendChild(addProjectToPage(project))
    })
    // document.querySelector('.projectList').appendChild(projects)
}