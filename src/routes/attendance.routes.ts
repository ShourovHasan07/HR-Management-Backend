

import express from 'express';
import {
  getAttendances,
  getAttendanceById,
  createOrUpdateAttendance,
  updateAttendance,
  deleteAttendance,
} from '../controllers/attendance.controller';

const router = express.Router();

router.get('/', getAttendances);
router.get('/:id', getAttendanceById);
router.post('/', createOrUpdateAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

export default router;