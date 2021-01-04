import { ProjectData } from '../lib/project';

type FormSubmitHandler = (projectData: ProjectData) => void;

const $PROJECT_FORM = document.querySelector('#project-form') as HTMLFormElement;
const $title        = $PROJECT_FORM.querySelector('#project-title') as HTMLInputElement;

class ProjectForm {
  submitHandler: FormSubmitHandler;

  constructor(onSubmit: FormSubmitHandler) {
    this.submitHandler = onSubmit;
    this.handleSubmit();
  }

  clear() {
    $title.value = '';
  }

  private handleSubmit() {
    $PROJECT_FORM.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitHandler({ title: $title.value.trim() });
      this.clear();
    });
  }
}

export default ProjectForm;
