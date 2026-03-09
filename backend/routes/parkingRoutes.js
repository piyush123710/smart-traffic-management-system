import express from 'express';
import Parking from '../models/Parking.js';

const router = express.Router();

// Get all smart parking lots and availability
router.get('/', async (req, res) => {
  try {
    const lots = await Parking.find({});
    res.json({ success: true, lots });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update parking availability (Simulated call from IoT sensor)
router.post('/update', async (req, res) => {
  try {
    const { parkingId, availableSlots } = req.body;
    const parking = await Parking.findOneAndUpdate(
       { parkingId },
       { availableSlots, lastUpdated: Date.now() },
       { new: true, upsert: true }
    );
    
    // Broadcast IoT sensor update to all connected frontend clients
    const io = req.app.get('io');
    io.emit('parkingUpdate', parking);

    res.json({ success: true, parking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
