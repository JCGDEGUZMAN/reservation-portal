import express from 'express';

import { list, store, modify, destroy } from '../controllers/reservationController.js';

const router = express.Router();

router.group('/reservation', router => {
    router.get('/', list)
    router.post('/', store)
    router.put('/:id', modify)
    router.delete('/:id', destroy)
});

export default router;