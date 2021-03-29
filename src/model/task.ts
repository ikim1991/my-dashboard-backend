import mongoose, { Document, Model } from 'mongoose';
import ApiError from '../error/ApiError';

interface TaskI{
    description: string;
    deadline: Date;
    completed: boolean;
    user: string
}

interface TaskIDoc extends TaskI, Document{

}

interface TaskIModel extends Model<TaskIDoc>{
    createNewTask(description: string, deadline: Date, userId: string): TaskI[] | ApiError
    toggleTaskComplete(id: string, userId: string): TaskI[] | ApiError
    getTasks(userId: string): TaskI[] | ApiError
    deleteTask(id: string, userId: string): TaskI[] | ApiError
}

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    deadline: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

taskSchema.static('createNewTask', async (description, deadline, userId) => {
    try{
        await Task.create({ description, deadline, user: userId })

        const tasks = await Task.find({ user: userId }).sort({deadline: 1})

        return tasks

    }catch(err){
        return ApiError.badRequest('Error in Creating New Task...')
    }
})

taskSchema.static('toggleTaskComplete', async (id, userId) => {
    try{
        const task = await Task.findOne({ _id: id, user: userId })

        if(!task){
            return ApiError.badRequest('Unable to Complete Task...')
        }

        if(task.completed){
            task.completed = false
        } else{
            task.completed= true
        }

        await task.save()

        const tasks = await Task.find({ user: userId }).sort({deadline: 1})

        return tasks

    }catch(err){
        return ApiError.badRequest('Error in Completing Task..')
    }
})

taskSchema.static('getTasks', async (userId) => {
    try{
        const tasks = await Task.find({ user: userId }).sort({deadline: 1})

        return tasks

    }catch(err){
        return ApiError.badRequest('Error in Getting Tasks...')
    }
})

taskSchema.static('deleteTask', async (id, userId) => {
    try{
        const task = await Task.findOneAndDelete({ _id: id, user: userId })

        if(!task){
            return ApiError.badRequest('Unable to Delete Task..')
        }

        const tasks = await Task.find({ user: userId }).sort({deadline: 1})

        return tasks

    }catch(err){
        return ApiError.badRequest('Error in Deleting Task..')
    }
})

const Task = mongoose.model<TaskIDoc, TaskIModel>("Task", taskSchema)
export default Task