// XState v5 task state machine for a single task lifecycle
// States: created -> inProgress -> review -> completed -> archived
// Events: START, SUBMIT_REVIEW, APPROVE, REJECT, ARCHIVE

import { createMachine } from 'xstate'

export const TASK_STATUSES = {
  created: 'Created',
  inProgress: 'In Progress',
  review: 'Review',
  completed: 'Completed',
  archived: 'Archived'
}

export function createTaskMachine(initialStatus = 'created') {
  return createMachine({
    id: 'task',
    initial: initialStatus,
    states: {
      created: {
        on: {
          START: { target: 'inProgress' },
          ARCHIVE: { target: 'archived' }
        }
      },
      inProgress: {
        on: {
          SUBMIT_REVIEW: { target: 'review' },
          ARCHIVE: { target: 'archived' }
        }
      },
      review: {
        on: {
          APPROVE: { target: 'completed' },
          REJECT: { target: 'inProgress' },
          ARCHIVE: { target: 'archived' }
        }
      },
      completed: {
        on: {
          ARCHIVE: { target: 'archived' }
        }
      },
      archived: {
        type: 'final'
      }
    }
  })
}


