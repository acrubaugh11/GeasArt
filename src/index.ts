import express, { Request, Response } from 'express';
import cors from 'cors';
import homeRoutes from './routes/homeRoutes';
import productsRoutes from './routes/productsRoutes';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import checkoutRoutes from './routes/checkoutRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json());

// Routes
app.use('/', homeRoutes); // Example route: http://localhost:3000/api/home
app.use('/products', productsRoutes);
app.use('/auth', authRoutes)
app.use('/contact', contactRoutes)
app.use('/', checkoutRoutes)

// Root route (optional)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Gea Art Backend!');
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

export default app;
