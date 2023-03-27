import mongoose from 'mongoose';

export const keySchema = new mongoose.Schema({
  user_id: { type: String },
  key: { type: String, default: null },
  secret: { type: String, default: null },
});

const Key = mongoose.model('binanceapikey', keySchema);

export default Key;
