import * as mongoose from 'mongoose';
const { Schema } = mongoose;
export const PermissionsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: 'Business',
    },
  },
  { timestamps: true },
);
