import Project from '../lib/project';

const $PROJECT_CONTAINER = document.querySelector("#projects") as HTMLDivElement;

type ProjectClickHandler = (project: Project) => void;

class ProjectUI {
    clickHandler: ProjectClickHandler;
    removeHandler: ProjectClickHandler;

    constructor(onClick: ProjectClickHandler, onRemove: ProjectClickHandler) {
        this.clickHandler  = onClick;
        this.removeHandler = onRemove;
    }

    add(project: Project): void {
        const div = document.createElement('div');
        div.classList.add('project');
        div.textContent = project.title;
        div.addEventListener('click', () => this.clickHandler(project));
        div.dataset.id = `${project.id}`;

        const removeIcon = document.createElement('span');
        removeIcon.classList.add('material-icons');
        removeIcon.innerHTML = 'close';

        removeIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeHandler(project)
        });

        div.appendChild(removeIcon);

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

    setActive(id: number) {
        const elems = Array.from($PROJECT_CONTAINER.querySelectorAll('.project'));
        for (let elem of elems) {
            elem.classList.remove('active');
        }
        const elem = $PROJECT_CONTAINER.querySelector(`.project[data-id="${id}"`);
        if (elem)
            elem.classList.add('active');
    }
}


export default ProjectUI;
