import { TodoData } from '../lib/todo';

type FormSubmitHandler = (todoData: TodoData) => void;

const $TODO_FORM = document.querySelector('#todo-form') as HTMLFormElement;

const $title = $TODO_FORM.querySelector('#todo-title') as HTMLInputElement;
const $description = $TODO_FORM.querySelector('#todo-description') as HTMLInputElement;
const $dueDate = $TODO_FORM.querySelector('#todo-due-date') as HTMLInputElement;
const $priority = $TODO_FORM.querySelectorAll('[name="priority"]') as NodeListOf<HTMLInputElement>;

class TodoForm {
  submitHandler: FormSubmitHandler;

  constructor(onSubmit: FormSubmitHandler) {
    this.submitHandler = onSubmit;
    this.handleSubmit();
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
