import { Document } from 'mongoose';

export interface UserModel extends Document {
  uidAuth?: string;
  name: string;
  email: string;
}
