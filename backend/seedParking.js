import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Parking from './models/Parking.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smart-traffic')
  .then(async () => {
    console.log('Seeding initial smart parking locations...');
    
    const lots = [
      {
        parkingId: 'P-001',
        locationName: 'Downtown Central Plaza',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        totalSlots: 150,
        availableSlots: 45,
        pricePerHour: 10
      },
      {
        parkingId: 'P-002',
        locationName: 'Mall Underground',
        coordinates: { lat: 40.7050, lng: -73.9950 },
        totalSlots: 300,
        availableSlots: 120,
        pricePerHour: 5
      },
      {
        parkingId: 'P-003',
        locationName: 'Hospital Visitor Parking',
        coordinates: { lat: 40.7180, lng: -73.9900 },
        totalSlots: 50,
        availableSlots: 2,
        pricePerHour: 8
      }
    ];

    await Parking.deleteMany({});
    await Parking.insertMany(lots);
    
    console.log('Parking locations seeded!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
