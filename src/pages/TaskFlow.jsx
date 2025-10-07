import React from 'react'
import AddTaskForm from '../taskflow/components/AddTaskForm'
import TaskList from '../taskflow/components/TaskList'
import { taskDB } from '../taskflow/mockDB'

const TaskFlowPage = () => {
  const [tasks, setTasks] = React.useState(() => {
    return taskDB.getAll()
  })

  const persist = React.useCallback((next) => {
    setTasks(next)
    taskDB.saveAll(next)
  }, [])

  const handleAdd = ({ title, description }) => {
    const generateId = () => {
      try {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
      } catch (_) {}
      return `task_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    }
    const newTask = {
      id: generateId(),
      title,
      description,
      status: 'created',
      createdAt: new Date().toISOString(),
      history: [{ at: new Date().toISOString(), event: 'created' }]
    }
    const next = [newTask, ...tasks]
    persist(next)
  }

  const handleChange = (updatedTask) => {
    const next = tasks.map(t => (t.id === updatedTask.id ? updatedTask : t))
    persist(next)
  }

  const handleDelete = (id) => {
    const next = tasks.filter(t => t.id !== id)
    persist(next)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">TaskFlow</h2>
      </div>
      <AddTaskForm onAdd={handleAdd} />
      <TaskList tasks={tasks} onChange={handleChange} onDelete={handleDelete} />
    </div>
  )
}

export default TaskFlowPage


