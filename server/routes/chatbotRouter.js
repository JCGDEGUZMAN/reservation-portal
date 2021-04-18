import express from 'express';

import { post, get } from '../controllers/chatbotController.js';

const router = express.Router();

router.group('', router => {
    router.get('/', get)
    router.post('/', post)
});

export default router;