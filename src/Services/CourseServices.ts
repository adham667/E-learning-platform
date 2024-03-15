import Course from "../Models/Course";
import User from "../Models/User";
import mongoose, { ObjectId } from 'mongoose';
import userType from "../types/user"
import gradeType from "../types/grade"
import courseType from "../types/course"
import Grade from "../Models/Grade";

const AddCourse = async (course:courseType) => {
    try {
        const addedCourse = await Course.create(course);
        return addedCourse;
    } catch (error) {
        throw error;
    }
};

const UpdateCourse = async (title:string, description:string, courseID:String) => {
    try{
        const course = await Course.findById(courseID);
        if (!course) {
            throw new Error('course not found');
        }
        course.title = title
        course.description = description
        const updatedcourse = await Course.findByIdAndUpdate(courseID, course).exec();
        return updatedcourse;
    } 
    catch (error) {
        throw error;
    }
};


const DeleteCourse = async (courseId:String) => {
    try{
        const course = await Course.findByIdAndDelete(courseId).exec();
        if (!course) {
            throw new Error('course not found');
        }
    } 
    catch (error) {
        throw error;
    }
};


const getEnrolledStudents = async (courseId: string) => {
    try {
        const course = await Course.findById(courseId).populate('students');
    if (!course) {
        throw new Error('Course not found');
    }

    const enrolledStudents = course.students.map((student: any)=> ({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
    }));

    return enrolledStudents;
    } catch (error) {
    throw error;
    }
};


const enrollStudent = async (courseId: string, studentId: string) => {
    try {
    const course = await Course.findById(courseId);
    if (!course) {
        throw new Error('Course not found');
    }
    
    const student = await User.findById(studentId);
    if (!student) {
        throw new Error('Student not found');
    }

    if (course.students.includes(new mongoose.Types.ObjectId(studentId))) {
        throw new Error('Student already enrolled in the course');
    }

    course.students.push(new mongoose.Types.ObjectId(studentId));
    await course.save();
    } catch (error) {
    throw error;
    }
};



const dropCourse = async (courseId: string, studentId: string) => {
    try {
      // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
        throw new Error('Course not found');
    }
    if (!course.students.includes(new mongoose.Types.ObjectId(studentId))) {
        throw new Error("Student not enrolled in the course");
    }
    course.students = course.students.filter(id => id.toString() !== studentId);
    const grade = await Grade.findOneAndDelete({ student: studentId, course: courseId });
    await course.save();
    } catch (error) {
    throw error;
    }
};

const getAllCourses = async () => {
    try {
    const courses = await Course.find();
    return courses;
    } catch (error) {
    throw error;
    }
};


const getCourse = async (courseId:String) => {
    try {
    const course = await Course.find(courseId);
    if(!course){
        throw new Error("No courses found"); 
    }
    return course;
    } catch (error) {
    throw error;
    }
};


const getCoursesForStudent = async (studentId:string) => {
    try {
      const courses = await Course.find({ students: studentId });
      return courses;
    } catch (error) {
      throw new Error('Error fetching courses for student');
    }
  };


export {AddCourse, UpdateCourse, DeleteCourse, getEnrolledStudents, enrollStudent, dropCourse, getAllCourses, getCourse, getCoursesForStudent};