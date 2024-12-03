import get from './get';
import post from './post';
import idRouter from './_id';

export default [get, post, ...idRouter];
