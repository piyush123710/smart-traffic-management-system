import express from 'express';
import TrafficSignal from '../models/TrafficSignal.js';
import Violation from '../models/Violation.js';

const router = express.Router();

// Get aggregated analytics data
router.get('/overview', async (req, res) => {
  try {
    // 1. Density Distribution
    const signals = await TrafficSignal.find({});
    const densityStats = { Low: 0, Medium: 0, High: 0, Severe: 0 };
    signals.forEach(sig => {
      densityStats[sig.trafficDensity || 'Low']++;
    });

    // 2. Violations Over Time (Mocking last 7 days for the chart based on current db)
    const violations = await Violation.find({}).sort({ timestamp: -1 });
    
    // Group violations by day (simplified for simulation)
    const violationTrends = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [12, 19, 15, 25, 22, 30, violations.length] // Injecting real DB length into 'Today'
    };

    // 3. Common Violation Types
    const typeDistribution = await Violation.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } }
    ]);
    const violationTypes = {
      labels: typeDistribution.map(t => t._id),
      data: typeDistribution.map(t => t.count)
    };

    res.json({
      success: true,
      data: {
        densityStats,
        violationTrends,
        violationTypes,
        totalSignals: signals.length,
        totalViolations: violations.length
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
