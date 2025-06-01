import express from 'express';
import { PrismaClient } from '@prisma/client';
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.post('/products', async (req, res) => {
  const { name, description, price, category } = req.body;
  const product = await prisma.product.create({
    data: { name, description, price, category },
  });
  res.json(product);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
