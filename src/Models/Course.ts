import mongoose from "mongoose";


const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    professor: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    students: [{ type: mongoose.Schema.ObjectId, ref: 'User', default: [] }],
    createdAt: { type: Date, default: Date.now }
});

const course = mongoose.model('Course', courseSchema);

export default course;