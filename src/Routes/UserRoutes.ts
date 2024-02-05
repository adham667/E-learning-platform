import express from 'express';
import {createUserController,updateUserController,deleteUserController} from '../Controllers/UserController'

const router = express.Router();


router.post('/create', createUserController);
router.put('/:userId', updateUserController);
router.delete('/:userId', deleteUserController);

module.exports = router;
