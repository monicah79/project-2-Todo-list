/**
 * @jest-environment jsdom
 */
import { delFromLocalStorage, saveToLocalStorage } from './local-storage.js';

describe('saveToLocalStorage', () => {
  test('Testing add to local storage function', () => {
    const task = 'Go shopping';
    const completed = false;
    const index = 1;

    saveToLocalStorage(task, completed, index);

    const todos = JSON.parse(localStorage.getItem('todos'));

    expect(todos).toEqual([{ task, completed, index }]);
  });

  // delete from local storage
  describe('delFromLocalStorage', () => {
    test('testing removing todos from local storage', () => {
      const task1 = 'Go shopping';
      const completed1 = false;
      const index1 = 1;
      const task2 = 'Do laundry';
      const completed2 = true;
      const index2 = 2;

      saveToLocalStorage(task1, completed1, index1);
      saveToLocalStorage(task2, completed2, index2);

      delFromLocalStorage(index1);

      const todos = JSON.parse(localStorage.getItem('todos'));

      expect(todos).toEqual([{ task: task2, completed: completed2, index: index2 }]);
      expect(todos.length).toBe(1);
    });
  });
});
