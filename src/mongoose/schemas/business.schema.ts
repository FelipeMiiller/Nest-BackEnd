import * as mongoose from 'mongoose';

const { Schema } = mongoose;

export const BusinessSchema = new Schema(
  {
    name: {
      type: String,
    },
    documnet: {
      type: String,
    },
    status: {
      type: Boolean,
    },
  },
  { timestamps: true },
);
