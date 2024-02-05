import express from 'express';
import gradeController from '../Controllers/GradeController';

const router = express.Router();


router.post('/assign', gradeController.assignGradeController);
router.get('/:studentId/:courseId?', gradeController.getStudentGradesController);
router.get('/average/:courseId', gradeController.getAverageCourseGradeController);

module.exports = router;
