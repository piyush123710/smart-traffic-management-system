import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const seedAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_traffic_db');

    // Wipe existing user table for clean state
    await User.deleteMany({});

    const users = [
      {
        name: 'Super Admin',
        email: 'admin@traffic.gov',
        password: 'admin123', // Will be hashed by mongoose pre save hook
        role: 'Admin',
        department: 'Global Control Header',
      },
      {
        name: 'Traffic Officer J. Doe',
        email: 'staff@traffic.gov',
        password: 'staff123',
        role: 'Staff',
        department: 'North Sector',
      }
    ];

    for (const user of users) {
      await User.create(user);
    }

    console.log('✅ Default users seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

seedAdmins();
