const Sprint = require('../models/Sprint');


const getSprints = async (req, res) => {
  try {
    const sprints = await Sprint.find().populate('tasks');
    res.json(sprints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const createSprint = async (req, res) => {
  try {
    const { name, goal, startDate, endDate, tasks } = req.body;

    const newSprint = new Sprint({
      name,
      goal,
      startDate,
      endDate,
      tasks
    });

    const savedSprint = await newSprint.save();
    res.status(201).json(savedSprint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const updateSprint = async (req, res) => {
  try {
    const { id } = req.params;
    
    let sprint = await Sprint.findById(id);
    if (!sprint) {
      return res.status(404).json({ message: 'Sprint not found' });
    }

    sprint = await Sprint.findByIdAndUpdate(id, req.body, { new: true });
    res.json(sprint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const deleteSprint = async (req, res) => {
  try {
    const { id } = req.params;
    
    const sprint = await Sprint.findById(id);
    if (!sprint) {
      return res.status(404).json({ message: 'Sprint not found' });
    }

    await Sprint.findByIdAndDelete(id);
    res.json({ message: 'Sprint removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSprints,
  createSprint,
  updateSprint,
  deleteSprint
};
