import mongoose, { Document, Model } from 'mongoose';
import ApiError from '../error/ApiError';
import { hash } from 'bcryptjs'

interface UserI extends Document{
    username: string;
    email: string;
    password: string;
}

interface UserIDoc extends UserI, Document{

}

interface UserIModel extends Model<UserIDoc>{
    registerUser(email: string, password: string, username: string): boolean | ApiError | null;
    loginUser(email: string): UserI | ApiError;
    getUserData(_id: string): UserI | ApiError;
}

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.static('registerUser', async (email: string, password: string, username: string) => {
    try{

        const allowed = await User.findOne({ email })

        if(allowed){
            return ApiError.badRequest('Email already in Use...')
        }

        await User.create({ email, password, username })

        return true

    }catch(err){
        return ApiError.badRequest('Error in Registering User...')
    }
})

UserSchema.static('loginUser', async (email) => {
    try{

        const user = await User.findOne({ email })

        if(!user){
            return ApiError.unauthorized('Wrong Email or Password was Provided...')
        }

        return user

    } catch(err){
        return ApiError.badRequest('Error in Logging in User...')
    }
})

UserSchema.static('getUserData', async (_id) => {
    try{
        const user = await User.findOne({ _id })

        if(!user){
            return ApiError.badRequest('User not Found in Database...')
        }

        return user

    }catch(err){
        return ApiError.badRequest('Error in Getting User Data...')
    }
})

UserSchema.pre<UserI>('save', async function(){
    if(this.isModified('password')){
        this.password = await hash(this.password!, +process.env.HASH_SALT!)
    }
})

const User = mongoose.model<UserIDoc, UserIModel>("User", UserSchema);
export default User;