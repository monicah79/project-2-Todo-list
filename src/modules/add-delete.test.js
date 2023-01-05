import { delFromLocalStorage, saveToLocalStorage } from './local-storage.js';

describe('testing add and remove functions', ()=>{
    test('testing add', ()=>{
        
        const todo1 = 'task1'
        const todo2 = 'task2'
        const todo3 = 'task3'
        const expectedLength = 3;
        saveToLocalStorage(todo1);
        saveToLocalStorage(todo2);
        saveToLocalStorage(todo3);

        expect(taskArr[0].task).toBe('task1')
        expect(taskArr[1].task).toBe('task2')
        expect(taskArr.length).toEqual(expectedLength)
    })
   

    //remove
    test('testing remove', ()=>{
        const todo2 = 'task2'
        const expectedLength = 2;
        delFromLocalStorage(0);

        expect(taskArr.length).toHaveLength(expectedLength)
        expect(taskArr[0].task).toBe(todo2)

    })
})