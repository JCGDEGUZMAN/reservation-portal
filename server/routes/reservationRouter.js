import express from 'express';

import { list, store } from '../controllers/reservationController.js';

const router = express.Router();

router.group('/reservation', router => {

    router.get('/', list)
    router.post('/', store)
    
});

export default router;