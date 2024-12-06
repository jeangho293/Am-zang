import { Router } from 'express';
import authRouter from './auth';
import companiesRouter from './companies';
import storages from './storages';
import usersRouter from './users';

export const adminsRouter = Router();

adminsRouter.use([...authRouter, ...companiesRouter, ...storages, ...usersRouter]);
