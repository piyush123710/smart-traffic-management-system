import express from 'express';
import Violation from '../models/Violation.js';

const router = express.Router();

// Get all violations
router.get('/', async (req, res) => {
  try {
    const violations = await Violation.find({}).sort({ timestamp: -1 });
    res.json({ success: true, violations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
