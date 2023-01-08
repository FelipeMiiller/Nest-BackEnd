import * as mongoose from 'mongoose';

const { Schema } = mongoose;

export const UsersSchema = new Schema(
  {
    uidAuth: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true },
);
