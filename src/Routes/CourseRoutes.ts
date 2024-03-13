import express from 'express';
import courseController from '../Controllers/CourseController';

const router = express.Router();


router.post('/create/:professorId', courseController.createCourseController);
router.put('/:courseId', courseController.updateCourseController);
router.delete('/:courseId', courseController.deleteCourseController);
router.get('/:courseId/students', courseController.getEnrolledStudentsController);
router.post('/:courseId/enroll', courseController.enrollStudentController);
router.delete('/:courseId/drop', courseController.dropCourseController);
router.get('/', courseController.getAllCoursesController);
router.get('/:courseId', courseController.getCourseController);
router.get('/:studentId/courses', courseController.getCoursesForStudentController)
module.exports = router;
