import { useEffect, useState } from "react"
import { TodoProvider } from "./contexts"
import TodoForm from "./Components/TodoForm"
import TodoItem from "./Components/TodoItem"

function App() {
  
  const [todos,setTodos] = useState([])

  const addTodo = (t) => {
    setTodos((oldTodo) => [...oldTodo,{id:Date.now(),...t}])
  }
  const editTodo = (id,todo) => {
      setTodos((oldts) => oldts.map((eachTodo) => (eachTodo.id === id) ? todo :eachTodo))
  }
  const deleteTodo = (id) => {
    setTodos((oldTodos) => oldTodos.filter((t) => t.id !== id))
  }
  const checkedComplete = (id) => {
    setTodos((oldTodo) => oldTodo.map((t) => (t.id === id)?{...t,isChacked: !(t.isChacked)}:t))
  }

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem("todos")) //get data from local storage
    if(ls && ls.length > 0){
      setTodos(ls)
    }
  },[])

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos)) //same key name as localStorage.getItem
  })

  return (
    <TodoProvider value={{addTodo,deleteTodo,editTodo,todos,checkedComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
              <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                  <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
              <div className="mb-4">
                  {/* Todo form goes here */} 
                  <TodoForm/>
              </div>
              <div className="flex flex-wrap gap-y-3">
                  {/*Loop and Add TodoItem here */}
                  {todos.map((t) => (
                    <div key={t.id} className="w-full">
                      <TodoItem todo={t}/>
                    </div>
                  ))}
              </div>
            </div>
      </div>
    </TodoProvider>
  )
}

export default App
