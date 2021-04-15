import  express from 'express';
import  mongoose from 'mongoose';
import  cors from 'cors';
import  { config } from 'dotenv';

const app = express();
const configuration = config();

app.use(express.json({ 
    limit: "30mb", 
    extended: true 
}));

app.use(express.urlencoded({
    limit: "30mb", 
     extended: true
}));

app.use(cors());

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false);