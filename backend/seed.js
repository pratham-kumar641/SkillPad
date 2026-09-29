const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Task = require('./models/Task');
const Sprint = require('./models/Sprint');
const Project = require('./models/Project');
const Submission = require('./models/Submission');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    await Sprint.deleteMany({});
    await Project.deleteMany({});
    await Submission.deleteMany({});

    console.log('Cleared existing data.');

    // Hash default password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    // Create Users
    const student1 = await User.create({
      name: 'Aman Sharma',
      email: 'student@gmail.com',
      password: hashedPassword,
      role: 'Student',
      skills: ['React.js', 'Node.js', 'MongoDB', 'JavaScript']
    });

    const student2 = await User.create({
      name: 'Rahul Kumar',
      email: 'rahul@gmail.com',
      password: hashedPassword,
      role: 'Student',
      skills: ['Python', 'Django', 'PostgreSQL', 'Git']
    });

    const student3 = await User.create({
      name: 'Priya Singh',
      email: 'priya@gmail.com',
      password: hashedPassword,
      role: 'Student',
      skills: ['React.js', 'Tailwind CSS', 'REST API', 'JavaScript']
    });

    const faculty = await User.create({
      name: 'Dr. Prof. Smith',
      email: 'faculty@gmail.com',
      password: hashedPassword,
      role: 'Faculty'
    });

    const recruiter = await User.create({
      name: 'TechRecruiter HR',
      email: 'recruiter@gmail.com',
      password: hashedPassword,
      role: 'Recruiter'
    });

    console.log('Users created.');

    // Only core users are seeded now. Default tasks and projects removed.
    console.log('🎉 Seed completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1);
  }
};

seedData();
