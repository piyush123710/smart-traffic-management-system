import mongoose from 'mongoose';

const parkingSchema = new mongoose.Schema({
  parkingId: {
    type: String,
    required: true,
    unique: true,
  },
  locationName: {
    type: String,
    required: true,
  },
  coordinates: {
    lat: Number,
    lng: Number,
  },
  totalSlots: {
    type: Number,
    required: true,
    default: 100,
  },
  availableSlots: {
    type: Number,
    required: true,
    default: 100,
  },
  pricePerHour: {
    type: Number,
    default: 5.0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
});

const Parking = mongoose.model('Parking', parkingSchema);
export default Parking;
