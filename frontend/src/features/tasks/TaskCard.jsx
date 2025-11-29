import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { useDispatch } from 'react-redux' // 1. Import dispatch
import { deleteTask } from './taskSlice' // 2. Import delete action
import UpdateTaskDialog from './UpdateTaskDialog' // 3. Import Edit Dialog

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react' // Import Trash Icon

const statusColors = {
  pending: 'bg-slate-500', // Updated keys to match Backend Enum if needed
  'in-progress': 'bg-blue-500',
  completed: 'bg-green-500',
}

export default function TaskCard({ task }) {
  const dispatch = useDispatch()

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
    data: { ...task },
  })

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task._id))
    }
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card className='mb-4 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing group relative'>
        <CardHeader className='p-4 pb-2 flex flex-row items-start justify-between space-y-0'>
          <CardTitle className='text-sm font-medium leading-none'>
            {task.title}
          </CardTitle>

          {/* ACTION BUTTONS */}
          {/* onPointerDown stops the drag event from firing when clicking buttons */}
          <div
            className='flex gap-1'
            onPointerDown={(e) => e.stopPropagation()}
          >
            {/* The Edit Dialog (Pencil Icon) */}
            <UpdateTaskDialog task={task} />

            {/* The Delete Button (Trash Icon) */}
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50'
              onClick={handleDelete}
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        </CardHeader>

        <CardContent className='p-4 pt-2'>
          <p className='text-xs text-muted-foreground line-clamp-2'>
            {task.description}
          </p>
        </CardContent>

        <CardFooter className='p-4 pt-0 flex justify-between items-center'>
          {/* Safe access to status color in case backend sends something unexpected */}
          <Badge
            className={`${
              statusColors[task.status] || 'bg-gray-500'
            } text-white`}
          >
            {task.status.replace('_', ' ')}
          </Badge>
        </CardFooter>
      </Card>
    </div>
  )
}
