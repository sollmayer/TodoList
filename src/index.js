import { addListeners } from "./domController";
import { displayCurrentSection, displayProjects, displayTasks } from "./displayController";
addListeners();
displayProjects();
// displayCurrentSection('All Tasks');
displayCurrentSection("All Tasks",document.querySelector('#allTasks'))