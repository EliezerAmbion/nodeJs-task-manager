const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch('/tasks/:id', async (req, res) => {
  const _id = req.params.id;

  const allowedUpdates = ['description', 'completed'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates' });
  }

  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(_id);

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
