import mongoose, { Document, Model } from 'mongoose';
import ApiError from '../error/ApiError';

interface JobsI{
    title: string;
    company: string;
    location: string;
    summary: string;
    link: string;
}

interface PostingsI{
    user: string;
    postings: JobsI[]
}

interface PostingIDoc extends PostingsI, Document{

}

interface PostingIModel extends Model<PostingIDoc>{
    getJobPostings(userId: string): PostingsI[] | ApiError;
    updateJobPostings(userId: string, postings: JobsI[]): PostingsI[] | ApiError;
}

const postingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
      },
      postings: []
})

postingSchema.static('getJobPostings', async (userId) => {
    try{
        const posts = await Posting.findOne({ user: userId })

        if(!posts){
            return ApiError.notFound('User Not Found...')
        }

        return posts.postings

    } catch(err){
        return ApiError.badRequest('Error in Getting Job Postings...')
    }
})

postingSchema.static('updateJobPostings', async (userId, postings) => {
    try{
        let posts = await Posting.findOne({ user: userId })

        if(!posts){
            posts = await Posting.create({ user: userId, postings })

            return posts.postings
        }

        posts.postings = postings
        posts.markModified('postings')
        await posts.save()

        return posts.postings

    } catch(err){
        return ApiError.badRequest('Error in Updating Job Postings...')
    }  
})


const Posting = mongoose.model<PostingIDoc, PostingIModel>("Posting", postingSchema)
export default Posting