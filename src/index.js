import { addListeners } from "./domController";
import { displayCurrentSection, displayProjects, displayTasks } from "./displayController";
addListeners();
displayProjects();
displayCurrentSection('All Tasks');
