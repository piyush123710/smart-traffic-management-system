import express from 'express';
import TrafficSignal from '../models/TrafficSignal.js';

const router = express.Router();

// Get all active signals
router.get('/', async (req, res) => {
  try {
    const signals = await TrafficSignal.find({});
    res.json({ success: true, signals });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
