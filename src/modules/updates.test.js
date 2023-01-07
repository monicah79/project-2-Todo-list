/**
 * @jest-environment jsdom
 */
import { changeLocalStorage } from './local-storage.js';
describe('testing edits, updates and clearing completed from LocalStorage', () => {
  test('edit test from local storage', ()=>{
    const task1 = 'Go shopping';
    const completed1 = false;
    const index1 = 1;
    const task2= 'Go driving';
    const completed2 = false;
    const index2 = 1;
    localStorage.setItem('todos', JSON.stringify([{ task: task1, completed: completed1, index: index1 }]));
    changeLocalStorage(task2, completed2, index2);

    
    expect(JSON.parse(localStorage.getItem('todos'))).toEqual([{ task: task2, completed: completed2,
         index: index2 }]);
     
  })

})