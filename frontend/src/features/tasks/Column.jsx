import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'

export default function Column({ id, title, count, children }) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'bg-card rounded-lg shadow-sm p-4 h-fit',
        isOver ? 'ring-2 ring-primary' : ''
      )}
    >
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-semibold'>{title}</h2>
        <span className='text-sm text-muted-foreground'>{count}</span>
      </div>
      <div className='space-y-2'>{children}</div>
    </div>
  )
}
