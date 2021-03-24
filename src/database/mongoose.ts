import mongoose from 'mongoose';
import config from '../config/mongoose';

mongoose.connect(
    config.uri,
    config.options
)

mongoose.connection.on('open', () => {
    console.log('Connected to MongoDB...')
})

mongoose.connection.on('error', err => {
    console.error(`${err.name} - ${err.message}`)
})