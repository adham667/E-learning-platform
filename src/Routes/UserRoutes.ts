import express from 'express';
import {createUserController,updateUserController,deleteUserController, loginUserController,getUserInfoController} from '../Controllers/UserController'

const router = express.Router();

router.post('/login', loginUserController);
router.get('/:userId', getUserInfoController);
router.post('/create', createUserController);
router.put('/:userId', updateUserController);
router.delete('/:userId', deleteUserController);

module.exports = router;
