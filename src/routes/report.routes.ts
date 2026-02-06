import { Router } from 'express';
import { getAttendanceReport } from '../controllers/report.controller';

const router = Router();

// Attendance reports
router.get('/attendance', getAttendanceReport);

export default router;