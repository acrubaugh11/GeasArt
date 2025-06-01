import { Request, Response } from 'express';

export const getHomeData = (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Gea Art!',
    feature: 'Handmade digital products and art pieces',
  });
};
