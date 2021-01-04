export enum Priority {
    high = 1,
    medium,
    low
};

export type TodoData = {
  title       : string;
  description : string;
  dueDate     : string;
  priority    : Priority;
};

class Todo {
    public id: number = Date.now();
    public title: string;
    public description: string;
    public dueDate: string;
    public priority: Priority;

    constructor(title: string, description: string, dueDate: string, priority: Priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    update({ title, description, dueDate, priority }: Partial<TodoData>): void {
        if (title) this.title = title;
        if (description) this.description = description;
        if (dueDate) this.dueDate = dueDate;
        if (priority) this.priority = priority;
    }
}

export default Todo;
