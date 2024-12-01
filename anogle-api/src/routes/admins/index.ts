import { Router } from 'express';
import authRouter from './auth';
import companiesRouter from './companies';
import usersRouter from './users';

export const adminsRouter = Router();

adminsRouter.use([...authRouter, ...companiesRouter, ...usersRouter]);
