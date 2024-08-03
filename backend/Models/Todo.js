const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  status: { type: Boolean, default: false },
});

module.exports = mongoose.model('Todo', TodoSchema);
