import { Task } from "@/types/task"

type Props = {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="px-4 py-3 text-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="accent-blue-600"
        />
      </td>
      <td className="px-4 py-3">
        <span className={task.completed ? "line-through text-gray-400" : "text-gray-800"}>
          {task.title}
        </span>
      </td>
      <td className="px-4 py-3 text-center">
      <button
            onClick={() => onDelete(task.id)}
            className="bg-red-100 text-red-700 border border-red-300 px-3 py-1 rounded hover:bg-red-200 transition"
            >
            Eliminar
        </button>
      </td>
    </tr>
  )
}
