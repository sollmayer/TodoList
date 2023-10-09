export class Task {
    constructor(title, description, dueDate,priority, project){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }

    getTitle = () => {
        return this.title;
    }

    setTitle = (title) => {
        this.title = title;
    }
}

export const createTask = (title, description, dueDate,priority, project) => {
    return new Task(title, description, dueDate,priority,project);
}

export const addTask = (tasks_arr) => {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#dueDate').value;
    const priority = document.querySelector('#priority').value;

    
    tasks_arr.push(createTask(title,description,dueDate,priority, getProject()));
    return {title, description, dueDate,priority}
}
