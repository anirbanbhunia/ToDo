import { useState } from "react";
import { useTodo } from "../contexts";

function TodoItem({ todo }) {

const[isTodoEditable,setEditable] = useState(false) 
const [todoMsg,setTodoMsg] = useState(todo.todo)   
const {editTodo,deleteTodo,checkedComplete} = useTodo()

const edit = () => {
    editTodo(todo.id,{...todo, todo:todoMsg})
    setEditable(false)
}
const toggle = () => {
    checkedComplete(todo.id)
}

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.isChacked ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.isChacked}
                onChange={toggle}
                disabled={isTodoEditable}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.isChacked ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.isChacked) return;

                    if (isTodoEditable) {
                        edit();
                    } else setEditable((prev) => !prev);
                }}
                disabled={todo.isChacked}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
