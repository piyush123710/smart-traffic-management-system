import express from 'express';
import Alert from '../models/Alert.js';
import TrafficSignal from '../models/TrafficSignal.js';
import Violation from '../models/Violation.js';

const router = express.Router();

// POST route simulating AI Event Ingestion from Python Microservice
router.post('/events', async (req, res) => {
  try {
    const { eventType, data } = req.body;
    const io = req.app.get('io');
    
    if (eventType === 'ACCIDENT_DETECTED') {
      const newAlert = new Alert({
        type: 'Accident',
        location: data.location,
        severity: 'Critical',
        description: `AI Detected Accident involving ${data.vehiclesInvolved || 2} vehicles.`,
      });
      await newAlert.save();
      
      // Broadcast to frontend
      io.emit('newAlert', newAlert);
      return res.status(201).json({ success: true, alert: newAlert });
    }

    if (eventType === 'TRAFFIC_DENSITY_UPDATE') {
      // Update the traffic signal based on AI camera count
      const signal = await TrafficSignal.findOneAndUpdate(
        { signalId: data.signalId },
        { 
          trafficDensity: data.density, // Low, Medium, High, Severe
          status: data.suggestedStatus || 'RED',
          lastUpdated: Date.now()
        },
        { new: true, upsert: true } // Create if doesn't exist for simulation
      );
      
      io.emit('densityUpdate', signal);
      return res.status(200).json({ success: true, signal });
    }

    if (eventType === 'EMERGENCY_VEHICLE_DETECTED') {
      const newAlert = new Alert({
        type: 'EmergencyVehicle',
        location: data.location,
        severity: 'High',
        description: `${data.vehicleType} Approaching. Creating Smart Green Corridor.`,
      });
      await newAlert.save();
      
      // Smart Corridor Logic: Force signals on the route to GREEN
      const routeSignals = data.route || [];
      await TrafficSignal.updateMany(
        { signalId: { $in: routeSignals } },
        { status: 'GREEN', lastUpdated: Date.now() }
      );

      io.emit('newAlert', newAlert);
      io.emit('smartCorridorActivated', { location: data.location, route: routeSignals });
      return res.status(201).json({ success: true, alert: newAlert });
    }

    if (eventType === 'ANPR_VIOLATION') {
      const violationId = 'V-' + Math.floor(10000 + Math.random() * 90000);
      const newViolation = new Violation({
        violationId,
        vehicleNumber: data.plateNumber,
        type: data.violationType,
        location: data.location,
        fineAmount: data.fineAmount || 100,
        imageUrl: data.imageUrl || 'mock_camera_frame.jpg',
      });
      await newViolation.save();

      io.emit('newViolation', newViolation);
      return res.status(201).json({ success: true, violation: newViolation });
    }

    if (eventType === 'WEATHER_UPDATE') {
      const newAlert = new Alert({
        type: 'Weather',
        location: data.location,
        severity: data.condition === 'Clear' ? 'Low' : 'Medium',
        description: `Weather Shift: ${data.condition}. Adjusting global signal timings.`,
      });
      await newAlert.save();
      
      // If weather is bad, artificially boost Red/Green limits (represented as a global socket event)
      io.emit('newAlert', newAlert);
      io.emit('weatherShift', { condition: data.condition });
      
      return res.status(200).json({ success: true, alert: newAlert });
    }

    return res.status(400).json({ success: false, message: 'Unknown eventType' });
  } catch (error) {
    console.error('Simulation Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET endpoints for fetching initial data to frontend Dashboard
router.get('/stats', async (req, res) => {
  try {
    const activeAlerts = await Alert.countDocuments({ status: 'Active' });
    const totalViolations = await Violation.countDocuments();
    const activeSignals = await TrafficSignal.countDocuments();

    res.json({
      success: true,
      data: {
        activeAlerts,
        totalViolations,
        activeSignals,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
