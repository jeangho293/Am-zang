import { Router } from 'express';
import uploadRouter from './upload';

export const imagesRouter = Router();

imagesRouter.use([...uploadRouter]);
