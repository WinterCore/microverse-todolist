import { TodoData } from '../lib/todo';

type FormSubmitHandler = (todoData: TodoData) => void;
type FormCloseHandler  = () => void;

const $TODO_FORM_OUTER = document.querySelector('.todo-form-outer') as HTMLDivElement;
const $TODO_FORM_INNER = $TODO_FORM_OUTER.querySelector('.todo-form-inner') as HTMLDivElement;
const $TODO_FORM       = document.querySelector('#todo-form') as HTMLFormElement;
const $formTitle       = $TODO_FORM_OUTER.querySelector('h2') as HTMLHeadingElement;

const $title       = $TODO_FORM.querySelector('#todo-title') as HTMLInputElement;
const $description = $TODO_FORM.querySelector('#todo-description') as HTMLInputElement;
const $dueDate     = $TODO_FORM.querySelector('#todo-due-date') as HTMLInputElement;
const $priority    = $TODO_FORM.querySelectorAll('[name="priority"]') as NodeListOf<HTMLInputElement>;

class TodoForm {
  submitHandler: FormSubmitHandler;
  closeHandler: FormCloseHandler;

  constructor(onSubmit: FormSubmitHandler, onClose: FormCloseHandler) {
    this.submitHandler = onSubmit;
    this.closeHandler = onClose;
    this.handleSubmit();

    $TODO_FORM_OUTER.addEventListener('click', () => this.hide());
    $TODO_FORM_INNER.addEventListener('click', (e) => e.stopPropagation());

    this.updateTitle('Add Note');
  }

  fill(todo: TodoData) {
    $title.value = todo.title;
    $description.value = todo.description;
    $dueDate.value = todo.dueDate;
    $priority[todo.priority - 1].checked = true;
  }

  clear() {
      $title.value = '';
      $description.value = '';
      $dueDate.value = '';
      $priority[0].checked = true;
  }

  updateTitle(title: string) {
      $formTitle.innerHTML = title;
  }

  show() {
      $TODO_FORM_OUTER.classList.add('shown');
  }

  hide() {
      $TODO_FORM_OUTER.classList.remove('shown');
      this.closeHandler();
  }

  private handleSubmit() {
    $TODO_FORM.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitHandler({
        title: $title.value.trim(),
        description: $description.value.trim(),
        dueDate: $dueDate.value.trim(),
        priority: +Array.from($priority).find(r => r.checked)!.value
      });
      this.clear();
    });
  }
}

export default TodoForm;
