/**
 * @jest-environment jsdom
 */
import { changeLocalStorage, clearAllCompleted, updateCompleted } from './local-storage.js';

describe('testing edits, updates and clearing completed from LocalStorage', () => {
  test('edit test from local storage', () => {
    const task1 = 'Go shopping';
    const completed1 = false;
    const index1 = 1;
    const task2 = 'Go driving';
    const completed2 = false;
    const index2 = 1;
    localStorage.setItem('todos', JSON.stringify([{ task: task1, completed: completed1, index: index1 }]));
    changeLocalStorage(task2, completed2, index2);

    expect(JSON.parse(localStorage.getItem('todos'))).toEqual([{
      task: task2,
      completed: completed2,
      index: index2,
    }]);
  });

  test('updated task is equal to true', () => {
    updateCompleted(0, true);
    const taskArr = JSON.parse(localStorage.getItem('todos'));
    expect(taskArr[0].completed).toBe(true);
  });

  test('updated task is equal to false', () => {
    updateCompleted(0, false);
    const taskArr = JSON.parse(localStorage.getItem('todos'));
    expect(taskArr[0].completed).toBe(false);
  });

  test('clear all completed tasks', () => {
    clearAllCompleted();
    const taskArr = JSON.parse(localStorage.getItem('todos'));
    expect(taskArr.length).toEqual(1);
  });
});