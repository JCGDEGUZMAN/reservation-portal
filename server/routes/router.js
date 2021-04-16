import expressGroup from 'express-group-routes';
import  express from 'express';

import reservationRouter from './reservationRouter.js';

const router = express.Router();

router.group(router => {
    router.use(reservationRouter)
});

export default router;