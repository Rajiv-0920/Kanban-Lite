import express from 'express'
import 'dotenv/config'
import path from 'path'

const app = express()
const PORT = process.env.PORT
const __dirname = path.resolve()

app.get('/api/tasks/', (req, res) => {
  res.status(200).json({ message: 'Success' })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))

  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server is running on the port: ${PORT}`)
})
