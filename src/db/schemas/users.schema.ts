import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  uidAuth: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});
