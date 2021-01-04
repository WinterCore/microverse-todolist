import Project, { ProjectData } from './lib/project';
import Todo, { TodoData } from './lib/todo';


import TodoUI from './ui/todo';
import ProjectUI from './ui/project';
import TodoForm from './ui/todo-form';
import ProjectForm from './ui/project-form';


let currentProject: Project | null = null;

let todoBeingEdited: Todo | null = null;

const onTodoEdit = (todo: Todo) => {
    console.log('Editing', todo);
    todoForm.fill(todo);
    todoBeingEdited = todo;
};

const onTodoDelete = (todo: Todo) => {
    console.log('Deleting', todo);
    if (!currentProject) return;
    todoRenderer.remove(todo.id);
    currentProject.removeTodo(todo.id);
};

const onProjectClick = (project: Project) => {
    currentProject = project;
    todoRenderer.setTitle(project.title);
    todoRenderer.clear();
    for (let todo of project.getTodos()) {
        todoRenderer.add(todo);
    }
};

const onTodoFormSubmit = ({ title, description, dueDate, priority }: TodoData) => {
    if (todoBeingEdited) {
        todoBeingEdited.update({ title, description, dueDate, priority });
        todoRenderer.update(todoBeingEdited);
        todoBeingEdited = null;
    } else {
        const todo = new Todo(title, description, dueDate, priority);
        if (!currentProject) return;
        todoRenderer.add(todo);
        currentProject.addTodo(todo);
    }
};

const onProjectFormSubmit = ({ title }: ProjectData) => {
    const project = new Project(title);
    projectRenderer.add(project);
};

const todoForm = new TodoForm(onTodoFormSubmit);
const projectForm = new ProjectForm(onProjectFormSubmit);
const todoRenderer = new TodoUI(onTodoEdit, onTodoDelete);
const projectRenderer = new ProjectUI(onProjectClick);
