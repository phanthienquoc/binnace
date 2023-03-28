import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String },
  password: { type: String },
  role: { type: String },
  user_id: { type: String, unique: true },
});
const User = mongoose.model('user', userSchema);

export default User;
