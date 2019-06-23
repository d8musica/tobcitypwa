const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const userSchema = new Schema({
  name: { type: 'String', required: false },
  idcedula: { type: 'Number', required: false },
  email: {
    type: String, required: false,
    trim: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  firstTime: { type: 'Boolean', default: true },
  confirmed: { type: 'Boolean', default: false },
  credit: { type: 'Number', default: 0 },
  cellphone: { type: 'Number' },
  city: { type: String },
  google: {
    avatar: { type: String },
    googleId: { type: String, required: false },
  },
  facebook: {
    avatar: { type: String },
    facebookId: { type: String, required: false },
  },
  dateCreated: { type: 'Date', default: Date.now, required: true },
  dateUpdated: { type: 'Date' },
  likes: [{ type: Schema.ObjectId, ref: 'Like' }],
  rateCount: { type: 'Number', default: '0' },
  rateValue: { type: 'Number', default: '0' },
});

// Create reference to User & export
const User = mongoose.model('User', userSchema);
module.exports = User;
