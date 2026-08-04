const express = require('express');
const prisma = require('../lib/prisma');
const auth = require('../middleware/auth');

const router = express.Router();

// Get vendor profile
router.get('/profile', auth, async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: req.vendor.id },
      select: {
        id: true,
        email: true,
        businessName: true,
        whatsappNumber: true,
        subscriptionStatus: true,
        subscriptionEndDate: true,
        createdAt: true
      }
    });
    res.json(vendor);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update vendor profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { businessName, whatsappNumber } = req.body;

    const vendor = await prisma.vendor.update({
      where: { id: req.vendor.id },
      data: { businessName, whatsappNumber }
    });

    res.json({
      message: 'Profile updated',
      vendor: {
        id: vendor.id,
        email: vendor.email,
        businessName: vendor.businessName,
        whatsappNumber: vendor.whatsappNumber
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get QR code data
router.get('/qr', auth, async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: req.vendor.id }
    });

    const qrData = {
      vendorId: vendor.id,
      businessName: vendor.businessName,
      whatsappNumber: vendor.whatsappNumber,
      menuUrl: `${process.env.FRONTEND_URL}/menu/${vendor.id}`
    };

    res.json(qrData);
  } catch (error) {
    console.error('QR data error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
