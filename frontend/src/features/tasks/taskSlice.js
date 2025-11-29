import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  board: [],
  loading: false,
  error: null,
}

const API_URL = 'http://localhost:3000/api/tasks'

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL)
      return response.data // This becomes action.payload in 'fulfilled'
    } catch (error) {
      // rejectWithValue allows us to send custom error data to the reducer
      return rejectWithValue(error.message || 'Something went wrong')
    }
  }
)

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, taskData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create task')
    }
  }
)

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update task')
    }
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      return id // Return the deleted task's ID
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete task')
    }
  }
)

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Case 1: Request started
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // Case 2: Request successful
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.board = action.payload // The data returned from the thunk
      })
      // Case 3: Request failed
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload // The error message from rejectWithValue
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false
        state.board.push(action.payload) // Add the new task to the board
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.board.findIndex(
          (task) => task._id === action.payload._id
        )
        if (index !== -1) {
          state.board[index] = action.payload
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.board = state.board.filter((task) => task._id !== action.payload)
      })
  },
})

export default taskSlice.reducer
