const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // reference from this field to another model to create the relationship. Name of the model i.e const User = mongoose.model('User', userSchema);
  },
});
// now we can easily fetch the entire user profile whenever we have access to an individual task.

module.exports = Task;

// The relationship we used is placed the owner to the tasks the he created.
// Not vice versa
