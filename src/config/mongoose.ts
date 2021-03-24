import { ConnectOptions } from 'mongoose';

const mongooseConfig: { uri: string, options: ConnectOptions} = {
    uri: process.env.MONGODB_URL,
    options: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
}

export default mongooseConfig