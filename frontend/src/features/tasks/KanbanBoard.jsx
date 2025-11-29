import React, { useEffect } from 'react'
import { DndContext } from '@dnd-kit/core'
import TaskCard from './TaskCard'
import CreateTaskDialog from './CreateTaskDialog'
import Column from './Column'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks, updateTask } from './taskSlice'

const COLUMNS = [
  { id: 'pending', label: 'Pending' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
]

export default function KanbanBoard() {
  const dispatch = useDispatch()
  const { board, loading, error } = useSelector((state) => state.tasks)
  const tasks = board || []

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over) return
    const taskId = active.id
    const newStatus = over.id

    const currentTask = tasks.find((t) => t._id === taskId)
    if (currentTask && currentTask.status === newStatus) return
    dispatch(
      updateTask({
        id: taskId,
        formData: { status: newStatus },
      })
    )
    // Dispatch Redux action here
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='h-screen bg-background p-8 flex flex-col'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold'>Project Board</h1>
          <CreateTaskDialog />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 h-full'>
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              id={col.id}
              title={col.label}
              count={tasks.filter((t) => t.status === col.id).length}
            >
              {tasks
                .filter((task) => task.status === col.id)
                .map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))}
            </Column>
          ))}
        </div>
      </div>
    </DndContext>
  )
}
