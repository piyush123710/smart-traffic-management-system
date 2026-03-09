import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Accident', 'Congestion', 'EmergencyVehicle', 'SignalMalfunction', 'Weather'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium',
  },
  description: String,
  status: {
    type: String,
    enum: ['Active', 'Resolved'],
    default: 'Active',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

const Alert = mongoose.model('Alert', alertSchema);
export default Alert;
