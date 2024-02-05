
import { Request, Response } from 'express';
import {AddUser, UpdateUser, DeleteUser} from '../Services/UserServices';

const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await AddUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const updateUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const updatedUser = await UpdateUser(req.body, userId);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    await DeleteUser(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export {createUserController,updateUserController,deleteUserController};
