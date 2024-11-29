import { Router } from 'express';
import authRouter from './auth';

export const adminsRouter = Router();

adminsRouter.use([...authRouter]);
