import { delFromLocalStorage, changeLocalStorage, resetIndex } from './local-storage.js';

const loadList = () => {
  const ul = document.querySelector('.todo-list');
  const taskArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
  if (taskArr.length > 0) {
    taskArr.forEach((todo) => {
      const li = document.createElement('li');
      li.className = 'li-todo';
      const attr = document.createAttribute('data-index');
      attr.value = todo.index;
      li.setAttributeNode(attr);
      li.innerHTML = `<div class="check">
      <input type="checkbox" class="checkbox">
      <div class="parent"><p class="para">${todo.task}</p></div>
  </div>
  <div>
      <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
      <i class="fa fa-trash" aria-hidden="true"></i>
  </div>`;
      ul.appendChild(li);
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
        const completed = false;
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
        resetIndex();
        window.location.reload();
      });
    });
  }
};
export default loadList;