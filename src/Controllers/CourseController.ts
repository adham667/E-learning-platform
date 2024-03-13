import { Request, Response } from 'express';
import {AddCourse, UpdateCourse, DeleteCourse, getEnrolledStudents, enrollStudent, dropCourse, getAllCourses, getCourse, getCoursesForStudent} from '../Services/CourseServices';
import Course from '../types/course';



const createCourseController = async (req: Request, res: Response) => {
  const { professor } = req.params;
  const {title, description} = req.body;
  const newcourse:Course={
    title,
    description,
    professor,
  }
  try {
    const course = await AddCourse( newcourse);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const updateCourseController = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  try {
    const updatedCourse = await UpdateCourse(req.body, courseId);
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const deleteCourseController = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  try {
    await DeleteCourse(courseId);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const getEnrolledStudentsController = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  try {
    const students = await getEnrolledStudents(courseId);
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const enrollStudentController = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const {studentId} = req.body;
    try {
      const enrolledStudent = await enrollStudent(courseId, studentId);
      res.status(201).json(enrolledStudent);
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  };
  
  const dropCourseController = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const studentId = req.query?.studentId as string | undefined;
    try {
      if (!studentId) {
        throw new Error('Student ID is missing');
      }
      await dropCourse(courseId, studentId);
      res.json({ message: 'Student dropped from course successfully' });
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  };
  
  const getAllCoursesController = async (req: Request, res: Response) => {
    try {
      const courses = await getAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  };
  
  const getCourseController = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    try {
      const course = await getCourse(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  };
  const getCoursesForStudentController = async (req:Request, res:Response) => {
    const { studentId } = req.params;
  
    try {
      const courses = await getCoursesForStudent(studentId);
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  };
  
  export default {
    createCourseController,
    updateCourseController,
    deleteCourseController,
    getEnrolledStudentsController,
    enrollStudentController,
    dropCourseController,
    getAllCoursesController,
    getCourseController,
    getCoursesForStudentController
  };
  
