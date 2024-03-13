import User from "../Models/User";
import userType from '../types/user'

const AddUser = async (userData:userType) => {
    try {
        const addedUser = await User.create(userData);
        console.log(userData);
        
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


const getUser = async(email:String)=>{
    try{
        const user = await User.findOne({email})
        return user;
    }
    catch(error){
        throw error
    }
}

const getUserById = async (userId:string)=> {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error('Error fetching user');
    }
}



export{AddUser, UpdateUser, DeleteUser, getUser, getUserById};