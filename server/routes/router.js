import expressGroup from 'express-group-routes';
import  express from 'express';

import reservationRouter from './reservationRouter.js';
import chatbotRouter from './chatbotRouter.js';

export const apiRouter = express.Router();

apiRouter.group(router => {
    router.use(reservationRouter)
});

export const webhookRouter = express.Router();

webhookRouter.group(router => {
    router.use(chatbotRouter)
});