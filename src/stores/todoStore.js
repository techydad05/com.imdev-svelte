import { supabase } from "../supabase.js";
import { writable } from "svelte/store";
export const todos = writable([]);

export const addTodo = async (todo) => {
    console.log('todo:', todo);
    const { data, error } = await supabase
    .from('todos')
    .insert([
    { title: todo.title, done: todo.done },
    ]);
    if (error) {
        console.error(error);
    }
}

export const loadTodos = (async () => {
    const { data, error } = await supabase.from('todos').select();
    if (error) {
        return console.error(error);
    }
    todos.set(data.sort((a, b) => a.id - b.id));
})();

export const loadTodoSub = (async () => {
    const todoSub = supabase
    .from('todos')
    .on('INSERT', payload => {
        console.log('new todo!', payload);
        todos.update(cur => [...cur, payload.new].sort((a, b) => a.id - b.id))
    })
    .on('UPDATE', payload => {
        console.log('todo updated!', payload.new.id);
        todos.update((cur) => {
            const index = cur.findIndex(obj => obj.id === payload.new.id);
            cur[index] = payload.new;
            return cur.sort((a, b) => a.id - b.id);
        });
    })
    .on('DELETE', payload => {

    })
    .subscribe()
})();


