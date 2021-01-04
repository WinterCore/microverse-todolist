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

        window.addEventListener('resize', () => {
            const todos = $TODO_CONTAINER.querySelectorAll('.todo') as NodeListOf<HTMLDivElement>;
            for (let todo of Array.from(todos)) {
                todo.style.height = `${todo.getBoundingClientRect().width}px`;
            }
        });
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
        const bottom = document.createElement('div');
        bottom.classList.add('bottom');

        const date = document.createElement('div');
        date.classList.add('due-date');
        date.textContent = todo.dueDate;

        const actions = document.createElement('div');
        actions.classList.add('actions');
        const edit = document.createElement('button');
        const editIcon = document.createElement('span');
        editIcon.classList.add('material-icons');
        editIcon.innerHTML = 'create';
        edit.appendChild(editIcon);
        const remove = document.createElement('button');
        const removeIcon = document.createElement('span');
        removeIcon.classList.add('material-icons');
        removeIcon.innerHTML = 'delete';
        remove.appendChild(removeIcon);

        actions.appendChild(edit);
        actions.appendChild(remove);

        bottom.appendChild(date);
        bottom.appendChild(actions);

        container.appendChild(heading);
        container.appendChild(content);
        container.appendChild(bottom);

        edit.addEventListener('click', () => this.editHandler(todo));
        remove.addEventListener('click', () => this.deleteHandler(todo));

        $TODO_CONTAINER.appendChild(container);

        // Flush dom updates
        container.offsetTop;

        container.style.height = `${container.getBoundingClientRect().width}px`;
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
