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

export { delFromLocalStorage, changeLocalStorage, resetIndex };