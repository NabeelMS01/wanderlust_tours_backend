const User = require('../models/user/user.model');
const bcrypt = require('bcryptjs');

const createAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.log('Admin credentials not set in .env');
      return;
    }

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) { 
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = new User({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user created successfully!');
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  }
};

module.exports = createAdminUser;
