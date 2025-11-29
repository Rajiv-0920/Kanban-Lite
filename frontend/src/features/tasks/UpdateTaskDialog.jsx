import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask } from './TaskSlice'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Pencil } from 'lucide-react'

export default function UpdateTaskDialog({ task }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
  })

  const { title, description } = formData

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  // Helper function to stop dnd-kit from stealing focus
  const handleKeyDown = (e) => {
    e.stopPropagation()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // FIX 1: Spread formData so the payload is { id: "123", title: "...", description: "..." }
    dispatch(updateTask({ id: task._id, formData }))

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon' className='h-8 w-8'>
          <Pencil className='h-4 w-4' />
          <span className='sr-only'>Edit Task</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form
          id='update-task-form'
          className='space-y-4'
          onSubmit={handleSubmit}
        >
          <div className='space-y-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              value={title}
              placeholder='Task title'
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              value={description}
              placeholder='Task description'
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </form>

        <DialogFooter>
          <Button type='submit' form='update-task-form'>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
