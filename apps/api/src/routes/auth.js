const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { email, password, businessName, whatsappNumber } = req.body;

    // Check if vendor exists
    const existingVendor = await prisma.vendor.findUnique({
      where: { email }
    });

    if (existingVendor) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create vendor
    const vendor = await prisma.vendor.create({
      data: {
        email,
        password: hashedPassword,
        businessName,
        whatsappNumber,
        subscriptionStatus: 'inactive'
      }
    });

    // Generate token
    const token = jwt.sign(
      { id: vendor.id, email: vendor.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Vendor created successfully',
      token,
      vendor: {
        id: vendor.id,
        email: vendor.email,
        businessName: vendor.businessName,
        whatsappNumber: vendor.whatsappNumber
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find vendor
    const vendor = await prisma.vendor.findUnique({
      where: { email }
    });

    if (!vendor) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValid = await bcrypt.compare(password, vendor.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: vendor.id, email: vendor.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      vendor: {
        id: vendor.id,
        email: vendor.email,
        businessName: vendor.businessName,
        whatsappNumber: vendor.whatsappNumber,
        subscriptionStatus: vendor.subscriptionStatus
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
