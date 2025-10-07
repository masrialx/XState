import React from 'react'
import TaskCard from './TaskCard'

const TaskList = ({ tasks, onChange, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-sm text-gray-600">
        No tasks yet. Add one above.
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} onChange={onChange} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default TaskList


