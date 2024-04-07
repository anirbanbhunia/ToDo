import { useContext } from "react";
import { createContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id:1,
            todo:"todo msg",
            isChacked: false
        }
    ],
    addTodo: (todo) => {},
    deleteTodo: (id) => {},
    editTodo:(id,todo) => {},
    checkedComplete: (id) => {}
})

export const TodoProvider = TodoContext.Provider

export const useTodo = () =>{
   return useContext(TodoContext)
}