import { Request, Response } from 'express';
import { AssignGrade, getStudentGrades, getSpecificStudentGrades, getAverageCourseGrade } from '../Services/GradeServices';

const assignGradeController = async (req: Request, res: Response) => {
  try {
    const addedGrade = await AssignGrade(req.body);
    res.status(201).json(addedGrade);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const getStudentGradesController = async (req: Request, res: Response) => {
  const { studentId, courseId } = req.params;
  try {
    if(!courseId){
        const grades = await getStudentGrades(studentId);
        res.json(grades);
    }
    else{
        const grade = await getSpecificStudentGrades(studentId, courseId);
        res.json(grade);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};


const getAverageCourseGradeController = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  try {
    const averageGrade = await getAverageCourseGrade(courseId);
    res.json({ averageGrade });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export default {assignGradeController,getStudentGradesController,getAverageCourseGradeController,};
