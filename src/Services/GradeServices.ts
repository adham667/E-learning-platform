import mongoose from "mongoose";
import Grade from "../Models/Grade";
import gradeType from "../types/grade"

const AssignGrade = async(grade:gradeType)=> {
    try{
        const addedGrade = await Grade.create(grade);
        return addedGrade;
    }catch(error){
        throw error;
    }
}


const getStudentGrades = async (studentId: string) => {
    try {
    const grades = await Grade.find({ student: studentId }).populate('course');
    return grades;
    } catch (error) {
    throw error;
    }
};

const getSpecificStudentGrades = async (studentId: string, courseId: string) => {
    try {
    const grade = await Grade.findOne({ student: studentId, course: courseId });
    if(!grade){
        return "no grade" ;
    }
    return grade.grade;
    } catch (error) {
    throw error;
    }
};

const getAverageCourseGrade = async (courseId: string) => {
    try {
    const averageGrade = await Grade.aggregate([
        { $match: { course: courseId } }, 
        { $group: { _id: null, averageGrade: { $avg: "$grade" } } },
    ]);
    if (averageGrade.length === 0) {
        return 0;
    }

    return averageGrade[0].averageGrade;
    } catch (error) {
    throw error;
    }
};

export {getAverageCourseGrade, getSpecificStudentGrades, getStudentGrades, AssignGrade};
