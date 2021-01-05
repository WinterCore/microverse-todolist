/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/project */ "./src/lib/project.ts");
/* harmony import */ var _lib_todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/todo */ "./src/lib/todo.ts");
/* harmony import */ var _localstorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localstorage */ "./src/localstorage.ts");
/* harmony import */ var _ui_todo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui/todo */ "./src/ui/todo.ts");
/* harmony import */ var _ui_project__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui/project */ "./src/ui/project.ts");
/* harmony import */ var _ui_todo_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui/todo-form */ "./src/ui/todo-form.ts");
/* harmony import */ var _ui_project_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui/project-form */ "./src/ui/project-form.ts");







// Hamburger nav
var $hamburger = document.querySelector('#hamburger');
var $nav = document.querySelector('nav');
$hamburger.addEventListener('click', function () {
    $nav.classList.toggle('open');
    $hamburger.classList.toggle('open');
});
var $addTodo = document.querySelector('#add-todo');
var currentProject = null;
var todoBeingEdited = null;
var projects = _localstorage__WEBPACK_IMPORTED_MODULE_2__.get();
$addTodo.addEventListener('click', function () {
    todoForm.show();
    todoForm.updateTitle('Add Todo');
});
var onTodoEdit = function (todo) {
    todoForm.fill(todo);
    todoBeingEdited = todo;
    todoForm.updateTitle('Edit Todo');
    todoForm.show();
    _localstorage__WEBPACK_IMPORTED_MODULE_2__.save(projects);
};
var onTodoDelete = function (todo) {
    if (!currentProject)
        return;
    todoRenderer.remove(todo.id);
    currentProject.removeTodo(todo.id);
    _localstorage__WEBPACK_IMPORTED_MODULE_2__.save(projects);
};
var onProjectClick = function (project) {
    if (currentProject && project.id === currentProject.id)
        return;
    currentProject = project;
    todoRenderer.setTitle(project.title);
    todoRenderer.clear();
    projectRenderer.setActive(project.id);
    for (var _i = 0, _a = project.getTodos(); _i < _a.length; _i++) {
        var todo = _a[_i];
        todoRenderer.add(todo);
    }
    $addTodo.classList.add('shown');
};
var onTodoFormSubmit = function (_a) {
    var title = _a.title, description = _a.description, dueDate = _a.dueDate, priority = _a.priority;
    if (todoBeingEdited) {
        todoBeingEdited.update({ title: title, description: description, dueDate: dueDate, priority: priority });
        todoRenderer.update(todoBeingEdited);
        todoBeingEdited = null;
    }
    else {
        var todo = new _lib_todo__WEBPACK_IMPORTED_MODULE_1__.default(title, description, dueDate, priority);
        if (currentProject) {
            todoRenderer.add(todo);
            currentProject.addTodo(todo);
        }
    }
    todoForm.hide();
    _localstorage__WEBPACK_IMPORTED_MODULE_2__.save(projects);
};
var onTodoFormClose = function () {
    todoBeingEdited = null;
    todoForm.clear();
};
var onProjectFormSubmit = function (_a) {
    var title = _a.title;
    var project = new _lib_project__WEBPACK_IMPORTED_MODULE_0__.default(title);
    projectRenderer.add(project);
    projects.push(project);
    _localstorage__WEBPACK_IMPORTED_MODULE_2__.save(projects);
};
var onProjectDelete = function (project) {
    if (currentProject && currentProject.id === project.id) {
        currentProject = null;
        $addTodo.classList.remove('shown');
        todoRenderer.clear();
        todoRenderer.setTitle('');
    }
    projects = projects.filter(function (p) { return p.id !== project.id; });
    _localstorage__WEBPACK_IMPORTED_MODULE_2__.save(projects);
    projectRenderer.remove(project.id);
};
var todoForm = new _ui_todo_form__WEBPACK_IMPORTED_MODULE_5__.default(onTodoFormSubmit, onTodoFormClose);
var todoRenderer = new _ui_todo__WEBPACK_IMPORTED_MODULE_3__.default(onTodoEdit, onTodoDelete);
var projectRenderer = new _ui_project__WEBPACK_IMPORTED_MODULE_4__.default(onProjectClick, onProjectDelete);
new _ui_project_form__WEBPACK_IMPORTED_MODULE_6__.default(onProjectFormSubmit);
for (var _i = 0, projects_1 = projects; _i < projects_1.length; _i++) {
    var project = projects_1[_i];
    projectRenderer.add(project);
}


/***/ }),

/***/ "./src/lib/project.ts":
/*!****************************!*\
  !*** ./src/lib/project.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var Project = /** @class */ (function () {
    function Project(title, todos) {
        if (todos === void 0) { todos = []; }
        this.id = Date.now();
        this.title = title;
        this.todos = todos;
    }
    Project.prototype.addTodo = function (todo) {
        this.todos.push(todo);
    };
    Project.prototype.removeTodo = function (id) {
        this.todos = this.todos.filter(function (todo) { return todo.id !== id; });
    };
    Project.prototype.getTodo = function (id) {
        return this.todos.find(function (todo) { return todo.id === id; });
    };
    Project.prototype.getTodos = function () {
        return this.todos;
    };
    return Project;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);


/***/ }),

/***/ "./src/lib/todo.ts":
/*!*************************!*\
  !*** ./src/lib/todo.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Priority": () => /* binding */ Priority,
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var Priority;
(function (Priority) {
    Priority[Priority["high"] = 1] = "high";
    Priority[Priority["medium"] = 2] = "medium";
    Priority[Priority["low"] = 3] = "low";
})(Priority || (Priority = {}));
;
var Todo = /** @class */ (function () {
    function Todo(title, description, dueDate, priority) {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    Todo.prototype.update = function (_a) {
        var title = _a.title, description = _a.description, dueDate = _a.dueDate, priority = _a.priority;
        if (title)
            this.title = title;
        if (description)
            this.description = description;
        if (dueDate)
            this.dueDate = dueDate;
        if (priority)
            this.priority = priority;
    };
    return Todo;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Todo);


/***/ }),

/***/ "./src/localstorage.ts":
/*!*****************************!*\
  !*** ./src/localstorage.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "save": () => /* binding */ save,
/* harmony export */   "get": () => /* binding */ get
/* harmony export */ });
/* harmony import */ var _lib_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/project */ "./src/lib/project.ts");
/* harmony import */ var _lib_todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/todo */ "./src/lib/todo.ts");


var save = function (data) {
    window.localStorage.setItem('data', JSON.stringify(data));
};
var get = function () {
    var data = window.localStorage.getItem('data');
    if (!data)
        return [];
    var projects = [];
    for (var _i = 0, _a = JSON.parse(data); _i < _a.length; _i++) {
        var item = _a[_i];
        var project = new _lib_project__WEBPACK_IMPORTED_MODULE_0__.default(item.title);
        project.id = item.id;
        projects.push(project);
        for (var _b = 0, _c = item.todos; _b < _c.length; _b++) {
            var _d = _c[_b], id = _d.id, title = _d.title, description = _d.description, dueDate = _d.dueDate, priority = _d.priority;
            var todo = new _lib_todo__WEBPACK_IMPORTED_MODULE_1__.default(title, description, dueDate, priority);
            todo.id = id;
            project.addTodo(todo);
        }
    }
    if (projects.length === 0) {
        projects.push(new _lib_project__WEBPACK_IMPORTED_MODULE_0__.default('Default'));
        save(projects);
    }
    return projects;
};


/***/ }),

/***/ "./src/ui/project-form.ts":
/*!********************************!*\
  !*** ./src/ui/project-form.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var $PROJECT_FORM = document.querySelector('#project-form');
var $title = $PROJECT_FORM.querySelector('#project-title');
var ProjectForm = /** @class */ (function () {
    function ProjectForm(onSubmit) {
        this.submitHandler = onSubmit;
        this.handleSubmit();
    }
    ProjectForm.prototype.clear = function () {
        $title.value = '';
    };
    ProjectForm.prototype.handleSubmit = function () {
        var _this = this;
        $PROJECT_FORM.addEventListener('submit', function (e) {
            e.preventDefault();
            _this.submitHandler({ title: $title.value.trim() });
            _this.clear();
        });
    };
    return ProjectForm;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectForm);


/***/ }),

/***/ "./src/ui/project.ts":
/*!***************************!*\
  !*** ./src/ui/project.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var $PROJECT_CONTAINER = document.querySelector("#projects");
var ProjectUI = /** @class */ (function () {
    function ProjectUI(onClick, onRemove) {
        this.clickHandler = onClick;
        this.removeHandler = onRemove;
    }
    ProjectUI.prototype.add = function (project) {
        var _this = this;
        var div = document.createElement('div');
        div.classList.add('project');
        div.textContent = project.title;
        div.addEventListener('click', function () { return _this.clickHandler(project); });
        div.dataset.id = "" + project.id;
        var removeIcon = document.createElement('span');
        removeIcon.classList.add('material-icons');
        removeIcon.innerHTML = 'close';
        removeIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            _this.removeHandler(project);
        });
        div.appendChild(removeIcon);
        $PROJECT_CONTAINER.appendChild(div);
    };
    ProjectUI.prototype.remove = function (id) {
        var elem = $PROJECT_CONTAINER.querySelector(".project[data-id=\"" + id + "\"]");
        if (elem) {
            elem.remove();
            return true;
        }
        return false;
    };
    ProjectUI.prototype.setActive = function (id) {
        var elems = Array.from($PROJECT_CONTAINER.querySelectorAll('.project'));
        for (var _i = 0, elems_1 = elems; _i < elems_1.length; _i++) {
            var elem_1 = elems_1[_i];
            elem_1.classList.remove('active');
        }
        var elem = $PROJECT_CONTAINER.querySelector(".project[data-id=\"" + id + "\"");
        if (elem)
            elem.classList.add('active');
    };
    return ProjectUI;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectUI);


/***/ }),

/***/ "./src/ui/todo-form.ts":
/*!*****************************!*\
  !*** ./src/ui/todo-form.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var $TODO_FORM_OUTER = document.querySelector('.todo-form-outer');
var $TODO_FORM_INNER = $TODO_FORM_OUTER.querySelector('.todo-form-inner');
var $TODO_FORM = document.querySelector('#todo-form');
var $formTitle = $TODO_FORM_OUTER.querySelector('h2');
var $title = $TODO_FORM.querySelector('#todo-title');
var $description = $TODO_FORM.querySelector('#todo-description');
var $dueDate = $TODO_FORM.querySelector('#todo-due-date');
var $priority = $TODO_FORM.querySelectorAll('[name="priority"]');
var TodoForm = /** @class */ (function () {
    function TodoForm(onSubmit, onClose) {
        var _this = this;
        this.submitHandler = onSubmit;
        this.closeHandler = onClose;
        this.handleSubmit();
        $TODO_FORM_OUTER.addEventListener('click', function () { return _this.hide(); });
        $TODO_FORM_INNER.addEventListener('click', function (e) { return e.stopPropagation(); });
        this.updateTitle('Add Note');
    }
    TodoForm.prototype.fill = function (todo) {
        $title.value = todo.title;
        $description.value = todo.description;
        $dueDate.value = todo.dueDate;
        $priority[todo.priority - 1].checked = true;
    };
    TodoForm.prototype.clear = function () {
        $title.value = '';
        $description.value = '';
        $dueDate.value = '';
        $priority[0].checked = true;
    };
    TodoForm.prototype.updateTitle = function (title) {
        $formTitle.innerHTML = title;
    };
    TodoForm.prototype.show = function () {
        $TODO_FORM_OUTER.classList.add('shown');
    };
    TodoForm.prototype.hide = function () {
        $TODO_FORM_OUTER.classList.remove('shown');
        this.closeHandler();
    };
    TodoForm.prototype.handleSubmit = function () {
        var _this = this;
        $TODO_FORM.addEventListener('submit', function (e) {
            e.preventDefault();
            _this.submitHandler({
                title: $title.value.trim(),
                description: $description.value.trim(),
                dueDate: $dueDate.value.trim(),
                priority: +Array.from($priority).find(function (r) { return r.checked; }).value
            });
            _this.clear();
        });
    };
    return TodoForm;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodoForm);


/***/ }),

/***/ "./src/ui/todo.ts":
/*!************************!*\
  !*** ./src/ui/todo.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var _a;
var $TODO_CONTAINER = document.querySelector('#todos');
var $TODO_TITLE = (_a = $TODO_CONTAINER.parentNode) === null || _a === void 0 ? void 0 : _a.querySelector('h1');
var TodoUI = /** @class */ (function () {
    function TodoUI(onEdit, onDelete) {
        this.editHandler = onEdit;
        this.deleteHandler = onDelete;
        window.addEventListener('resize', function () {
            var todos = $TODO_CONTAINER.querySelectorAll('.todo');
            for (var _i = 0, _a = Array.from(todos); _i < _a.length; _i++) {
                var todo = _a[_i];
                if (todo.classList.contains('fullscreen'))
                    todo.style.height = 'auto';
                else
                    todo.style.height = todo.getBoundingClientRect().width + "px";
            }
        });
    }
    TodoUI.prototype.setTitle = function (text) {
        $TODO_TITLE.textContent = text;
    };
    TodoUI.prototype.add = function (todo) {
        var _this = this;
        var container = document.createElement('div');
        container.dataset.id = "" + todo.id;
        container.classList.add('todo');
        container.classList.add("priority-" + todo.priority);
        var heading = document.createElement('h2');
        heading.textContent = todo.title;
        var content = document.createElement('p');
        content.textContent = todo.description;
        var bottom = document.createElement('div');
        bottom.classList.add('bottom');
        var date = document.createElement('div');
        date.classList.add('due-date');
        date.textContent = todo.dueDate;
        var actions = document.createElement('div');
        actions.classList.add('actions');
        var edit = document.createElement('button');
        var editIcon = document.createElement('span');
        editIcon.classList.add('material-icons');
        editIcon.innerHTML = 'create';
        edit.appendChild(editIcon);
        var remove = document.createElement('button');
        var removeIcon = document.createElement('span');
        removeIcon.classList.add('material-icons');
        removeIcon.innerHTML = 'delete';
        remove.appendChild(removeIcon);
        var close = document.createElement('button');
        var closeIcon = document.createElement('span');
        close.classList.add('todo-close');
        closeIcon.classList.add('material-icons');
        closeIcon.innerHTML = 'close';
        close.appendChild(closeIcon);
        actions.appendChild(edit);
        actions.appendChild(remove);
        bottom.appendChild(date);
        bottom.appendChild(actions);
        container.appendChild(close);
        container.appendChild(heading);
        container.appendChild(content);
        container.appendChild(bottom);
        container.addEventListener('click', function () { return container.classList.add('fullscreen'); });
        edit.addEventListener('click', function (e) {
            e.stopPropagation();
            _this.editHandler(todo);
        });
        remove.addEventListener('click', function (e) {
            e.stopPropagation();
            _this.deleteHandler(todo);
        });
        close.addEventListener('click', function (e) {
            e.stopPropagation();
            container.classList.remove('fullscreen');
        });
        $TODO_CONTAINER.appendChild(container);
        // Flush dom updates
        container.offsetTop;
        container.style.height = container.getBoundingClientRect().width + "px";
    };
    TodoUI.prototype.update = function (todo) {
        var container = $TODO_CONTAINER.querySelector(".todo[data-id=\"" + todo.id + "\"]");
        if (!container)
            return;
        for (var i = 1; i <= 3; i += 1) {
            container.classList.remove("priority-" + i);
        }
        container.classList.add("priority-" + todo.priority);
        container.querySelector('h2').textContent = todo.title;
        container.querySelector('p').textContent = todo.description;
        container.querySelector('.due-date').textContent = todo.dueDate;
    };
    TodoUI.prototype.remove = function (id) {
        var elem = $TODO_CONTAINER.querySelector(".todo[data-id=\"" + id + "\"]");
        if (elem) {
            elem.remove();
            return true;
        }
        return false;
    };
    TodoUI.prototype.clear = function () {
        $TODO_CONTAINER.innerHTML = '';
    };
    return TodoUI;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodoUI);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=172935d813dc10f942ec_bundle.js.map