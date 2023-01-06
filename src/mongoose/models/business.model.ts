import { Document } from 'mongoose';

export interface BusinessModel extends Document {
  name: string;
  document: string;
  status: boolean;
}
