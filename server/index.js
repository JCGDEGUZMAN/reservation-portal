import  express from 'express';
import  cors from 'cors';

import dbconnect from './database/connection.js';
import { apiRouter, webhookRouter } from './routes/router.js';

const app = express();

//INITIAL CONFIGURATIONS
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.static('public'));

app.use(express.json({ 
    limit: "30mb", 
    extended: true 
}));

app.use(express.urlencoded({
    limit: "30mb", 
    extended: true
}));

//DATABASE CONNECTION
dbconnect
    .then(() => app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`)))
    .catch((error) => console.log(error.message))

//API ROUTES
app.get('/', (req, res) => {
    res.send('Reservation Portal API & Webhooks');
})

app.use('/api', apiRouter);
app.use('/webhook', webhookRouter);