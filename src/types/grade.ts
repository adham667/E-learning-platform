// gradeTypes.ts
import { Document, Types } from 'mongoose';
import User from './user';
import Course from './grade';

interface Grade extends Document {
  student: Types.ObjectId | User;
  course: Types.ObjectId | Course;
  grade: number;
  feedback?: string;
  createdAt: Date;
}

export default Grade;
