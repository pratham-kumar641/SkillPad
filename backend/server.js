const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/sprints', require('./routes/sprintRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/code', require('./routes/codeRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.send('SkillPad API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
