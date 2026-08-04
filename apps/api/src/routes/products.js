const express = require('express');
const prisma = require('../lib/prisma');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all products for a vendor
router.get('/', auth, async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { vendorId: req.vendor.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a product
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;

    // Check subscription
    if (req.vendor.subscriptionStatus !== 'active') {
      return res.status(403).json({ error: 'Active subscription required' });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        imageUrl,
        vendorId: req.vendor.id
      }
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a product
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, imageUrl, isAvailable } = req.body;

    // Check product exists and belongs to vendor
    const existingProduct = await prisma.product.findFirst({
      where: { id: parseInt(id), vendorId: req.vendor.id }
    });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        imageUrl,
        isAvailable
      }
    });

    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a product
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findFirst({
      where: { id: parseInt(id), vendorId: req.vendor.id }
    });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await prisma.product.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get public menu by vendor ID (no auth required)
router.get('/public/:vendorId', async (req, res) => {
  try {
    const vendorId = parseInt(req.params.vendorId);

    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: {
        id: true,
        businessName: true,
        whatsappNumber: true,
        products: {
          where: { isAvailable: true },
          orderBy: { category: 'asc' }
        }
      }
    });

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    res.json(vendor);
  } catch (error) {
    console.error('Get public menu error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
