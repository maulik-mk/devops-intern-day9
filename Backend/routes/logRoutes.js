import express from 'express';
import { rootHandler, getLogs } from '../controllers/logController.js';

const router = express.Router();

router.get('/', rootHandler);
router.get('/all', getLogs);

export default router;
