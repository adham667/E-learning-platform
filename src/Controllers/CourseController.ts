import { Request, Response } from 'express';
import {AddCourse, UpdateCourse, DeleteCourse, getEnrolledStudents, enrollStudent, dropCourse, getAllCourses, getCourse} from '../Services/CourseServices';

const createCourseController = async (req: Request, res: Response) => {
  const { professorId } = req.params;
  try {
    const course = await AddCourse( req.body, professorId);
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
    try {
      const enrolledStudent = await enrollStudent(courseId, req.body.studentId);
      res.status(201).json(enrolledStudent);
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  };
  
  const dropCourseController = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    try {
      await dropCourse(courseId, req.body.studentId);
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
  
  export default {
    createCourseController,
    updateCourseController,
    deleteCourseController,
    getEnrolledStudentsController,
    enrollStudentController,
    dropCourseController,
    getAllCoursesController,
    getCourseController,
  };
  
