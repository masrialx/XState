// Simple localStorage-backed mock DB for tasks

const STORAGE_KEY = 'taskflow.tasks.v1'

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    return []
  }
}

function writeStorage(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (e) {
    // ignore
  }
}

export const taskDB = {
  getAll() {
    return readStorage()
  },
  saveAll(tasks) {
    writeStorage(tasks)
  },
  add(task) {
    const tasks = readStorage()
    tasks.unshift(task)
    writeStorage(tasks)
    return task
  },
  update(id, updater) {
    const tasks = readStorage()
    const idx = tasks.findIndex(t => t.id === id)
    if (idx === -1) return null
    const next = { ...tasks[idx], ...updater }
    tasks[idx] = next
    writeStorage(tasks)
    return next
  },
  remove(id) {
    const tasks = readStorage()
    const next = tasks.filter(t => t.id !== id)
    writeStorage(next)
  }
}


