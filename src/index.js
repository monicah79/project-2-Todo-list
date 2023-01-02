import loadList from './modules/load-list.js';
import './style.css';
import { delFromLocalStorage, changeLocalStorage, resetIndex } from './modules/local-storage.js';

const form = document.querySelector('.input-form');
const ul = document.querySelector('.todo-list');
const input = document.querySelector('.top-b');

const saveToLocalStorage = (task, completed, index) => {
  const todo = { task, completed, index };

  const taskArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

  taskArr.push(todo);
  localStorage.setItem('todos', JSON.stringify(taskArr));
};

const addTodo = (e) => {
  e.preventDefault();
  const taskArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

  const task = input.value;
  const completed = false;
  const index = (taskArr.length + 1).toString();
  if (task) {
    const li = document.createElement('li');
    li.className = 'li-todo';
    const attr = document.createAttribute('data-index');
    attr.value = index;
    li.setAttributeNode(attr);
    li.innerHTML = `<div class="check">
    <input type="checkbox" class="checkbox">
    <div class="parent"><p class="para">${task}</p></div>
</div>
<div>
    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
    <i class="fa fa-trash" aria-hidden="true"></i>
</div>`;
    ul.appendChild(li);
    const todoObj = {};
    todoObj.task = task;
    todoObj.completed = false;
    todoObj.index = index;

    saveToLocalStorage(task, completed, index);

    input.value = '';

    // checkbox
    const checkboxes = li.querySelectorAll('.checkbox');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (e) => {
        if (checkbox.checked === true) {
          const todo = e.target.nextElementSibling.childNodes[0];
          todo.style.textDecoration = 'line-through';
          const todoLi = e.target.parentElement.parentElement;
          const { index } = todoLi.dataset;
          const taskArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
          taskArr.filter((todo) => {
            if (todo.index === index) {
              todo.completed = true;
            }
            return false;
          });
          localStorage.setItem('todos', JSON.stringify(taskArr));
        } else {
          const todo = e.target.nextElementSibling.childNodes[0];
          todo.style.textDecoration = 'none';
          const todoLi = e.target.parentElement.parentElement;
          const { index } = todoLi.dataset;
          const taskArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
          taskArr.filter((todo) => {
            if (todo.index === index) {
              todo.completed = false;
            }
            return false;
          });
          localStorage.setItem('todos', JSON.stringify(taskArr));
        }
      });
    });

    // delete task
    const optionBtn = li.querySelector('.fa-ellipsis-v');
    const trash = li.querySelector('.fa-trash');
    optionBtn.addEventListener('click', (e) => {
      optionBtn.classList.add('hide');
      trash.classList.add('show');
      const edit = e.target.parentElement.previousElementSibling.lastElementChild.childNodes[0];
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.className = 'changed-task';
      li.classList.add('edit-task');
      editInput.value = edit.textContent;
      const editIndex = e.target.parentElement.parentElement.dataset.index;
      const parentDiv = e.target.parentElement.previousElementSibling.lastElementChild;
      parentDiv.removeChild(edit);
      parentDiv.appendChild(editInput);

      editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          edit.textContent = editInput.value;

          parentDiv.appendChild(edit);
          parentDiv.removeChild(editInput);
          li.classList.remove('edit-task');
          optionBtn.classList.remove('hide');
          trash.classList.remove('show');
        }
        changeLocalStorage(edit.textContent, completed, editIndex);
      });
    });
    trash.addEventListener('click', (e) => {
      const task = e.target.parentElement.parentElement;
      const { index } = task.dataset;
      ul.removeChild(li);
      delFromLocalStorage(index);
    });
  }
};

form.addEventListener('submit', addTodo);

const clearBtn = document.querySelector('.bottom');
clearBtn.addEventListener('click', () => {
  let taskArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
  taskArr = taskArr.filter((todo) => {
    if (todo.completed !== true) {
      return true;
    }
    return false;
  });
  localStorage.setItem('todos', JSON.stringify(taskArr));
  resetIndex();
  window.location.reload();
});

window.addEventListener('DOMContentLoaded', () => {
  loadList();
});

function createNewListItem(task) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');

  checkbox.type = 'checkbox';
  li.innerText = task;

  li.appendChild(checkbox);
  li.appendChild(label);

  return li;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const task = event.target.elements.task.value;
  const li = createNewListItem(task);
  ul.appendChild(li);
  event.target.elements.task.value = '';
});