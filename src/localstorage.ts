import Project from './lib/project';
import Todo    from './lib/todo';

export const save = (data: Project[]) => {
    window.localStorage.setItem('data', JSON.stringify(data));
};

export const get = (): Project[] => {
    const data = window.localStorage.getItem('data');
    if (!data) return [];
    let projects = [];
    for (let item of JSON.parse(data)) {
        const project = new Project(item.title);
        project.id = item.id;
        projects.push(project);
        for (let { id, title, description, dueDate, priority } of item.todos) {
            const todo = new Todo(title, description, dueDate, priority);
            todo.id = id;
            project.addTodo(todo);
        }
    }
    if (projects.length === 0) {
      projects.push(new Project('Default'));
      save(projects);
    }
    return projects;
};
