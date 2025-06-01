import { PrismaClient } from '@prisma/client';
import express from 'express';
import Stripe from 'stripe';


const prisma = new PrismaClient();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-04-30.basil',
});

router.post('/checkout', async (req, res): Promise<any> => {
  const { productId } = req.body;
  const productIdInt = parseInt(productId, 10)

  try {
    const product = await prisma.product.findUnique({
      where: { id: productIdInt },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
                 name: product.name,
                 description: product.description ?? undefined,
                 },
            unit_amount: product.price * 100, // Assuming `price` is in dollars in DB
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/shop',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router