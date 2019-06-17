const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const travelSchema = new Schema({
  nameFrom: String,
  nameTo: String,
  latFrom: { type: Number },
  lngFrom: { type: Number },
  latTo: { type: Number },
  lngTo: { type: Number },
  date: { type: 'Date' },
  plate: { type: 'String' },
  price: { type: 'Number' },
  polyline: { type: 'String' },
  content: { type: 'String' },
  dateAdded: { type: 'Date', default: Date.now },
  dateUpdated: { type: 'Date' },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  passenger: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  traveltype: String,
  pets: Boolean,
  lugagge: Boolean,
  smoke: Boolean,
  food: Boolean,
  sits: { type: 'Number', default: '4' },
});

module.exports = mongoose.model('Travel', travelSchema);
