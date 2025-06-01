// controllers/productsController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
    return;  // <-- add this
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
    return;
  }
}

export async function getProductById(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
    return;
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
    return;
  }
}


export async function createProduct(req: Request, res: Response): Promise<any> {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = parseFloat(req.body.price);
    const category = req.body.category;

    const file = req.file as Express.MulterS3.File;
    const imageUrl = file?.location;

    if (!name || !price || !category || !imageUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        category,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
}



export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl, category } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        category,
      },
    });

    res.json(updatedProduct);
    return;
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
    return;
  }
}

export async function deleteProduct(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
}
