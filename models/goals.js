const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User' //this will be an association with the user model
  },
  goalWeight: {
    type: Number,
    min: [0, 'Value must be greater than zero'],
    required: [true, 'Success is easier when you set a goal!']
  },
  goalCalPerDay: {
    type: Number,
    //min?
    required: [true, 'Success is easier when you set a goal!']
  },
  goalProteinPerDay: {
    type: Number,
    required: [true, 'Success is easier when you set a goal!']
  }
});

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;
