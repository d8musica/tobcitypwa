import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const likeSchema = new Schema({
  passenger: { type: Schema.Types.ObjectId, ref: 'User' },
  travel: { type: Schema.Types.ObjectId, ref: 'Travel' },
  like: { type: 'Boolean', default: false },
  value: { type: Number },
  dateCreated: { type: 'Date', default: Date.now, required: true },
});
    // Create reference to User & export
const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
