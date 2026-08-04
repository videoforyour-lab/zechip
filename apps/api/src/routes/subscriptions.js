const express = require('express');
const prisma = require('../lib/prisma');
const auth = require('../middleware/auth');

const router = express.Router();

// Get subscription status
router.get('/status', auth, async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: req.vendor.id },
      select: {
        subscriptionStatus: true,
        subscriptionEndDate: true
      }
    });

    res.json(vendor);
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Initiate subscription (Paystack)
router.post('/initiate', auth, async (req, res) => {
  try {
    // This is where you'd call Paystack API
    // For now, we'll return a mock response
    res.json({
      message: 'Subscription initiated',
      paymentUrl: 'https://paystack.com/pay/menuboxgh',
      reference: 'mock_ref_' + Date.now()
    });
  } catch (error) {
    console.error('Initiate subscription error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Webhook for Paystack
router.post('/webhook', async (req, res) => {
  try {
    const event = req.body;
    
    // Verify webhook signature (implement with Paystack)
    if (event.event === 'charge.success') {
      const transaction = event.data;
      
      // Update vendor subscription
      await prisma.vendor.update({
        where: { email: transaction.customer.email },
        data: {
          subscriptionStatus: 'active',
          subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        }
      });

      // Create subscription record
      await prisma.subscription.create({
        data: {
          vendorId: req.vendor.id,
          paystackRef: transaction.reference,
          amount: transaction.amount / 100,
          status: 'success',
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
      });
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
