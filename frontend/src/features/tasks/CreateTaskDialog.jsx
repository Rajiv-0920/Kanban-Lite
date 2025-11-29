import React, { useState } from 'react'
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
import { Plus } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { createTask } from './taskSlice'

export default function CreateTaskDialog() {
  // 1. Create a state to control whether the dialog is Open or Closed
  const [open, setOpen] = useState(false)
  const [task, setTask] = useState({ title: '', description: '' })

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setTask({ ...task, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(createTask(task)).unwrap()
      setTask({ title: '', description: '' })
      setOpen(false)
    } catch (error) {
      // TODO: show an error message / toast instead of silently failing
      console.error('Failed to create task', error)
    }
  }

  return (
    // 3. Connect the state to the Dialog component
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <Plus className='h-4 w-4' />
          Add New Task
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Create a card for your Kanban board. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          id='create-task-form'
          className='space-y-4'
          onSubmit={handleSubmit}
        >
          <div className='space-y-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              placeholder='Task title'
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              placeholder='Task description'
              value={task.description}
              onChange={handleChange}
            />
          </div>
        </form>
        <DialogFooter>
          <Button type='submit' form='create-task-form'>
            Save Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
