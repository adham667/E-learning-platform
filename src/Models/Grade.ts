import mongoose from "mongoose";


const gradeSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.ObjectId, ref: 'Course', required: true },
    grade: { type: Number, required: true, min: 0, max: 100 },
    feedback: { type: String },
    createdAt: { type: Date, default: Date.now }
});


const grade = mongoose.model("grade", gradeSchema);

export default grade;