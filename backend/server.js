import express from 'express';
import 'dotenv/config';
import path from 'path';
import cors from 'cors';

import { connectDB } from './config/db.js';
import taskRoutes from './routes/task.route.js';

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
const allowedOrigins = [
  'http://localhost:5173',
  'https://kanban-lite-eta.vercel.app',
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);

app.use('/api/tasks', taskRoutes);
app.get('/health', (req, res) => {
  res.send('OK');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on the port: ${PORT}`);
    });
  } catch (error) {
    console.log(`Server failed to start: ${error}`);
  }
};

startServer();
