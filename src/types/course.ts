// courseTypes.ts
import { Document, Types } from 'mongoose';
import User from './user';

interface Course extends Document {
  title: string;
  description?: string;
  image?: string;
  professor: Types.ObjectId | User;
  students: Types.Array<Types.ObjectId | User>;
  createdAt: Date;
}

export default Course;
