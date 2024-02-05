import User from "../Models/User";
import userType from '../types/user'

const AddUser = async (userData:userType) => {
    try {
        const addedUser = await User.create(userData);
        return addedUser;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

const UpdateUser = async (updateduser:userType, userID:String) => {
    try{
        const user = await User.findByIdAndUpdate(userID, updateduser).exec();
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } 
    catch (error) {
        throw error;
    }
}

const DeleteUser = async (userId:String) => {
    try{
        const user = await User.findByIdAndDelete(userId).exec();
        if (!user) {
            throw new Error('User not found');
        }
    } 
    catch (error) {
        throw error;
    }
}


export{AddUser, UpdateUser, DeleteUser};