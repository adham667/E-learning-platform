import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'student' },
    createdAt: { type: Date, default: Date.now }
});

const user = mongoose.model('User', userSchema);

export default user;