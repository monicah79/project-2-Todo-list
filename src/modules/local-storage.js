const delFromLocalStorage = (index) => {
  let taskArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

  taskArr = taskArr.filter((item) => {
    if (item.index !== index) {
      return true;
    }
    return false;
  });

  localStorage.setItem('todos', JSON.stringify(taskArr));
};

const saveToLocalStorage = (task, completed, index) => {
  const todo = { task, completed, index };

  const taskArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

  taskArr.push(todo);
  localStorage.setItem('todos', JSON.stringify(taskArr));
};

const changeLocalStorage = (task, status, index) => {
  let taskArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
  taskArr = taskArr.map((item) => {
    if (item.index === index) {
      item.task = task;
      item.completed = status;
    }
    return item;
  });
  localStorage.setItem('todos', JSON.stringify(taskArr));
};

const clearAllCompleted = () => {
  const taskArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
  taskArr.filter((todo) => !todo.completed);
  localStorage.setItem('todos', JSON.stringify(taskArr));
};

const updateCompleted = (id, completed) => {
  const taskArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
  taskArr[id].completed = completed;
  localStorage.setItem('todos', JSON.stringify(taskArr));
};

const resetIndex = () => {
  const taskArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
  const arr = [];

  taskArr.forEach((obj) => {
    const newObj = { ...obj, index: (arr.length + 1).toString() };
    arr.push(newObj);
  });
  localStorage.setItem('todos', JSON.stringify(arr));
  window.location.reload();
};

export {
  delFromLocalStorage,
  changeLocalStorage,
  resetIndex,
  saveToLocalStorage,
  clearAllCompleted,
  updateCompleted,
};