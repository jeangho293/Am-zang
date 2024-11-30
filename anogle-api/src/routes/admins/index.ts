import { Router } from 'express';
import authRouter from './auth';
import usersRouter from './users';

export const adminsRouter = Router();

adminsRouter.use([...authRouter, ...usersRouter]);
