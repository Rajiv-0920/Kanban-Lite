import Task from '../models/tasks.js'

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export const createTask = async (req, res) => {
  const { title, description } = req.body
  try {
    const newTask = new Task({ title, description })
    const savedTask = await newTask.save()
    res.status(201).json(savedTask)
  } catch (error) {
    console.error('Error creating task:', error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export const updateTaskStatus = async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.status(200).json({ ...updatedTask._doc })
  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export const deleteTask = async (req, res) => {
  const { id } = req.params
  try {
    const deletedTask = await Task.findByIdAndDelete(id)
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.status(200).json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Error deleting task:', error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export const updateTask = async (req, res) => {
  const { id } = req.params
  const { title, description, status } = req.body
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true, runValidators: true }
    )
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.status(200).json({ ...updatedTask._doc })
  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({ message: 'Server Error' })
  }
}
