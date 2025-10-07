import React from 'react'
import { useMachine } from '@xstate/react'
import { createTaskMachine, TASK_STATUSES } from '../../taskflow/taskMachine'

const statusBadge = (status) => {
  const key = typeof status === 'string' ? status : String(status || 'created')
  const color = {
    created: 'bg-gray-100 text-gray-800',
    inProgress: 'bg-blue-100 text-blue-800',
    review: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    archived: 'bg-purple-100 text-purple-800'
  }[key] || 'bg-gray-100 text-gray-800'
  const label = TASK_STATUSES[key] || key
  return <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${color}`}>{label}</span>
}

const TaskCard = ({ task, onChange, onDelete }) => {
  const [state, send] = useMachine(() => createTaskMachine(task.status))
  const rawValue = state && typeof state === 'object' ? state.value : state
  const current = typeof rawValue === 'string' ? rawValue : (typeof task.status === 'string' ? task.status : 'created')

  React.useEffect(() => {
    if (current !== task.status) {
      onChange({
        ...task,
        status: current,
        history: [...(task.history || []), { at: new Date().toISOString(), event: `-> ${current}` }]
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  const actions = []
  if (current === 'created') actions.push({ label: 'Start', onClick: () => send({ type: 'START' }) })
  if (current === 'inProgress') actions.push({ label: 'Submit Review', onClick: () => send({ type: 'SUBMIT_REVIEW' }) })
  if (current === 'review') {
    actions.push({ label: 'Approve', onClick: () => send({ type: 'APPROVE' }) })
    actions.push({ label: 'Reject', onClick: () => send({ type: 'REJECT' }) })
  }
  if (current !== 'archived') actions.push({ label: 'Archive', onClick: () => send({ type: 'ARCHIVE' }) })

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{task.title}</h4>
          <p className="text-sm text-gray-600">{task.description || '—'}</p>
        </div>
        {statusBadge(current)}
      </div>
      <div className="flex flex-wrap gap-2">
        {actions.map((a, idx) => (
          <button key={idx} onClick={a.onClick} className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700">
            {a.label}
          </button>
        ))}
        <button onClick={() => onDelete(task.id)} className="px-3 py-1 text-xs rounded-md bg-red-600 text-white hover:bg-red-700 ml-auto">
          Delete
        </button>
      </div>
      {Array.isArray(task.history) && task.history.length > 0 && (
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-700 mb-1">History</p>
          <ul className="space-y-1 max-h-24 overflow-y-auto pr-1">
            {task.history.map((h, i) => (
              <li key={i} className="text-xs text-gray-600">
                <span className="font-mono text-[10px] text-gray-500 mr-2">{new Date(h.at).toLocaleString()}</span>
                {h.event}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TaskCard


