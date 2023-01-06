import { Document, Schema } from 'mongoose';

export interface PermissionModel extends Document {
  user: Schema.Types.ObjectId;
  type: string;
  status: boolean;
  business: Schema.Types.ObjectId;
}
