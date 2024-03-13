
import { Request, Response } from 'express';
import {AddUser, UpdateUser, DeleteUser, getUser, getUserById} from '../Services/UserServices';
import User from '../types/user';
const createUserController = async (req: Request, res: Response) => {
  try {
    const {email, firstName, lastName, password, role} = req.body
    const newuser : User = 
    {email,
      firstName,
      lastName,
        password,
          role}
    const user = await AddUser(newuser);
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


const loginUserController = async (req:Request, res:Response)=>{
  const { email, password } = req.body;
  
  let user;
  try {
    user =await getUser(email);
    
    if(user){
      if(user.password===password){
        res.json(user)
      }
      else{
        res.json("password is incorrect")
      }
    }
    else{
      res.json("no user found")
    }
  } catch (error) {
    res.status(500).json(user);
  }
}

const getUserInfoController = async (req:Request, res:Response)=>{
  const userId = req.params.userId;

    try {
        const user = await getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "something went wrong"});
    }

}


export {createUserController,updateUserController,deleteUserController, loginUserController, getUserInfoController};
