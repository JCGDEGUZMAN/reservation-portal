import  mongoose from 'mongoose';
import  { config } from 'dotenv';

const configuration = config();

const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.set('useFindAndModify', false);

const dbconnection = mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });

export default dbconnection;