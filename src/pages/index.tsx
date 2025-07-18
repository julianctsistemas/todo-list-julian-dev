import { useEffect, useState } from "react"
import TaskItem from "@/components/TaskItem"
import { Task } from "@/types/task"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
 
  const fetchTasks = async () => {
    const res = await fetch("/api/tasks")
    const data = await res.json()
    setTasks(data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleAddTask = async () => {
    const trimmed = title.trim()
  
    if (!trimmed) {
      setErrorMsg("El campo no puede estar vacío.")
      return
    }
  
    if (trimmed.length < 3) {
      setErrorMsg("La tarea debe tener al menos 3 caracteres.")
      return
    }
  
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: trimmed }),
    })
  
    if (!res.ok) {
      const data = await res.json()
      setErrorMsg(data.error || "No se pudo agregar la tarea.")
      return
    }
  
    setTitle("")
    setErrorMsg("")
    fetchTasks()
  }
  

  const handleToggleTask = async (id: string) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
    })
  
    if (!res.ok) {
      setErrorMsg("No se pudo actualizar la tarea.")
      return
    }
  
    setErrorMsg("")
    fetchTasks()
  }
  

  const handleDeleteTask = async (id: string) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    })
  
    if (res.status === 403) {
      setErrorMsg("Solo puedes eliminar tareas completadas.")
      return
    }
  
    if (!res.ok) {
      setErrorMsg("Ocurrió un error al eliminar la tarea.")
      return
    }
  
    setErrorMsg("")
    fetchTasks()
  }
  
  

  const sortedTasks = [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed))

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Lista de Tareas</h1>
        {errorMsg && (
          <div className="bg-red-100 text-red-800 px-4 py-2 mb-4 rounded">
            {errorMsg}
          </div>
        )}
       <div className="flex gap-2 mb-6">
          <input
            id="taskInput"
            type="text"
            placeholder="Escribe tu tarea aquí..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-2 text-gray-800 placeholder-gray-400 border border-gray-300 rounded"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-all"
          >
            Agregar
          </button>
        </div>


        <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-300 rounded">
          <thead className="bg-gray-200 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-2 w-10">✔</th>
              <th className="px-4 py-2">Tarea</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}
