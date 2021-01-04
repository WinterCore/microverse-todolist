import Todo from './todo';

export type ProjectData = {
  title : string;
};

class Project {
    public id: number = Date.now();
    public title: string;
    private todos: Todo[];

    constructor(title: string, todos: Todo[] = []) {
        this.title = title;
        this.todos = todos;
    }

    addTodo(todo: Todo): void {
        this.todos.push(todo);
    }

    removeTodo(id: number): void {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    getTodo(id: number): Todo | undefined {
        return this.todos.find(todo => todo.id === id);
    }

    getTodos(): Todo[] {
        return this.todos;
    }
}

export default Project;
