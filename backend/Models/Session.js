const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  loginTime: { type: Date, default: Date.now },
  logoutTime: { type: Date },
  ipAddress: { type: String },
});

module.exports = mongoose.model('Session', SessionSchema);
