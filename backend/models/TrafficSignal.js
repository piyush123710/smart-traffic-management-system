import mongoose from 'mongoose';

const trafficSignalSchema = new mongoose.Schema({
  signalId: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['GREEN', 'YELLOW', 'RED', 'OUT_OF_ORDER'],
    default: 'RED',
  },
  currentTimer: {
    type: Number,
    default: 0,
  },
  greenDuration: {
    type: Number,
    default: 45, // seconds
  },
  redDuration: {
    type: Number,
    default: 45, // seconds
  },
  trafficDensity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Severe'],
    default: 'Low',
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
});

const TrafficSignal = mongoose.model('TrafficSignal', trafficSignalSchema);
export default TrafficSignal;
