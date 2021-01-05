import Project, { ProjectData } from './lib/project';
import Todo, { TodoData }       from './lib/todo';

import * as storage from './localstorage';

import TodoUI      from './ui/todo';
import ProjectUI   from './ui/project';
import TodoForm    from './ui/todo-form';
import ProjectForm from './ui/project-form';


// Hamburger nav
const $hamburger = document.querySelector('#hamburger') as HTMLDivElement;
const $nav       = document.querySelector('nav') as HTMLDivElement;

$hamburger.addEventListener('click', () => {
    $nav.classList.toggle('open');
    $hamburger.classList.toggle('open');
});


const $addTodo = document.querySelector('#add-todo') as HTMLDivElement;

let currentProject: Project | null = null;

let todoBeingEdited: Todo | null = null;

let projects = storage.get();

$addTodo.addEventListener('click', () => {
  todoForm.show();
  todoForm.updateTitle('Add Todo');
});

const onTodoEdit = (todo: Todo) => {
    todoForm.fill(todo);
    todoBeingEdited = todo;
    todoForm.updateTitle('Edit Todo');
    todoForm.show();
    storage.save(projects);
};

const onTodoDelete = (todo: Todo) => {
    if (!currentProject) return;
    todoRenderer.remove(todo.id);
    currentProject.removeTodo(todo.id);
    storage.save(projects);
};

const onProjectClick = (project: Project) => {
    if (currentProject && project.id === currentProject.id) return;
    currentProject = project;
    todoRenderer.setTitle(project.title);
    todoRenderer.clear();
    projectRenderer.setActive(project.id);
    for (let todo of project.getTodos()) {
        todoRenderer.add(todo);
    }
    $addTodo.classList.add('shown');
};

const onTodoFormSubmit = ({ title, description, dueDate, priority }: TodoData) => {
    if (todoBeingEdited) {
        todoBeingEdited.update({ title, description, dueDate, priority });
        todoRenderer.update(todoBeingEdited);
        todoBeingEdited = null;
    } else {
        const todo = new Todo(title, description, dueDate, priority);
        if (currentProject) {
            todoRenderer.add(todo);
            currentProject.addTodo(todo);
        }
    }
    todoForm.hide();
    storage.save(projects);
};

const onTodoFormClose = () => {
  todoBeingEdited = null;
  todoForm.clear();
};

const onProjectFormSubmit = ({ title }: ProjectData) => {
    const project = new Project(title);
    projectRenderer.add(project);
    projects.push(project);
    storage.save(projects);
};

const onProjectDelete = (project: Project) => {
    if (currentProject && currentProject.id === project.id) {
        currentProject = null;
        $addTodo.classList.remove('shown');
        todoRenderer.clear();
        todoRenderer.setTitle('');
    }
    projects = projects.filter(p => p.id !== project.id);
    storage.save(projects);
    projectRenderer.remove(project.id);
};

const todoForm        = new TodoForm(onTodoFormSubmit, onTodoFormClose);
const todoRenderer    = new TodoUI(onTodoEdit, onTodoDelete);
const projectRenderer = new ProjectUI(onProjectClick, onProjectDelete);

new ProjectForm(onProjectFormSubmit);

for (let project of projects) {
    projectRenderer.add(project);
}
