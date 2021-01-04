import Project from '../lib/project';

const $PROJECT_CONTAINER = document.querySelector("#projects") as HTMLDivElement;

type ProjectClickHandler = (project: Project) => void;

class ProjectUI {
    clickHandler: ProjectClickHandler

    constructor(clickHandler: ProjectClickHandler) {
        this.clickHandler = clickHandler
    }

    add(project: Project): void {
        const div = document.createElement('div');
        div.classList.add('project');
        div.textContent = project.title;
        div.addEventListener('click', () => this.clickHandler(project));
        div.dataset.id = `${project.id}`;

        $PROJECT_CONTAINER.appendChild(div);
    }

    remove(id: number): boolean {
        const elem = $PROJECT_CONTAINER.querySelector(`.project[data-id="${id}"]`);
        if (elem) {
            elem.remove();
            return true;
        }
        return false;
    }
}


export default ProjectUI;
