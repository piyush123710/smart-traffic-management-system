import mongoose from 'mongoose';

const violationSchema = new mongoose.Schema({
  violationId: {
    type: String,
    required: true,
    unique: true,
  },
  vehicleNumber: {
    type: String, // ANPR detected string
    required: true,
  },
  type: {
    type: String,
    enum: ['Red Light Jump', 'Over-speeding', 'Wrong Lane', 'No Helmet', 'No Seatbelt'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  fineAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending Review', 'Challan Issued', 'Paid', 'Dismissed'],
    default: 'Pending Review',
  },
  imageUrl: {
    type: String, // URL/Path to the captured frame showing violation
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

const Violation = mongoose.model('Violation', violationSchema);
export default Violation;
