import Todo from '../lib/todo';

const $TODO_CONTAINER = document.querySelector('#todos') as HTMLDivElement;
const $TODO_TITLE     = $TODO_CONTAINER.parentNode?.querySelector('h1') as HTMLHeadingElement;

type TodoClickHandler = (todo: Todo) => void;

class TodoUI {
    editHandler: TodoClickHandler;
    deleteHandler: TodoClickHandler;

    constructor(onEdit: TodoClickHandler, onDelete: TodoClickHandler) {
        this.editHandler   = onEdit;
        this.deleteHandler = onDelete;
    }

    setTitle(text: string) {
      $TODO_TITLE.textContent = text;
    }

    add(todo: Todo): void {
        const container = document.createElement('div');
        container.dataset.id = `${todo.id}`;
        container.classList.add('todo');
        container.classList.add(`priority-${todo.priority}`);
        const heading = document.createElement('h2');
        heading.textContent = todo.title;
        const content = document.createElement('p');
        content.textContent = todo.description;
        const date = document.createElement('div');
        date.classList.add('due-date');
        date.textContent = todo.dueDate;

        const edit = document.createElement('button');
        edit.textContent = 'Edit';
        const remove = document.createElement('button');
        remove.textContent = 'Delete';

        container.appendChild(heading);
        container.appendChild(content);
        container.appendChild(date);
        container.appendChild(edit);
        container.appendChild(remove);

        edit.addEventListener('click', () => this.editHandler(todo));
        remove.addEventListener('click', () => this.deleteHandler(todo));

        $TODO_CONTAINER.appendChild(container);
    }

    update(todo: Todo): void {
      const container = $TODO_CONTAINER.querySelector(`.todo[data-id="${todo.id}"]`);
      if (!container) return;
      for (let i = 1; i <= 3; i += 1) {
        container.classList.remove(`priority-${i}`);
      }
      container.classList.add(`priority-${todo.priority}`);
      container.querySelector('h2')!.textContent = todo.title;
      container.querySelector('p')!.textContent = todo.description;
      container.querySelector('.due-date')!.textContent = todo.dueDate;
    }

    remove(id: number): boolean {
        const elem = $TODO_CONTAINER.querySelector(`.todo[data-id="${id}"]`);
        if (elem) {
            elem.remove();
            return true;
        }
        return false;
    }

    clear(): void {
        $TODO_CONTAINER.innerHTML = '';
    }
}

export default TodoUI;
