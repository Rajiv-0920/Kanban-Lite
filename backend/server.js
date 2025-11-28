import express from 'express'
import 'dotenv/config'
import path from 'path'
import { connectDB } from './config/db.js'
import taskRoutes from './routes/task.route.js'

const app = express()
const PORT = process.env.PORT
const __dirname = path.resolve()

app.use(express.json())
app.use('/api/tasks', taskRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))

  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
  })
}

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server is running on the port: ${PORT}`)
    })
  } catch (error) {
    console.log(`Server failed to start: ${error}`)
  }
}

startServer()
