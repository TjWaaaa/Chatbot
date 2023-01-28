import express from 'express';
import { userSchema } from '../schemas/user';
import isAuthenticated from '../services/auth/isAuthenticated';
import signin from '../services/auth/signin';
import { destroySession } from '../services/auth/session';
import signup from '../services/auth/signup';
import { validate } from '../utils/validate';

const authRouter: express.Router = express.Router();

/**
 * @api {post} /auth/signup Sign Up
 * @apiName Sign Up
 * @apiGroup Auth
 * @apiDescription Creates a new account
 *
 * @apiBody {
 *  email: string
 *  password: string
 * }
 *
 * @apiSuccessExample
 *  - 200 User Registered successfully
 *
 * @apiError
 * - 400 ZodError Invalid email address
 * - 400 ZodError Password must be 8 or more characters long
 * - Error Prisma Unique constraint failed on the fields: (`email`)
 */
authRouter.post('/signup', validate(userSchema), signup);

/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiGroup Auth
 * @apiDescription To login to your account
 *
 * @apiBody {
 *  email: string
 *  password: string
 * }
 *
 * @apiSuccessExample
 * - 200 User successfully logged in
 *
 *
 * @apiError
 * - 400 ZodError Invalid email address
 * - 400 ZodError Password must be 8 or more characters long
 * - 401 Password is wrong
 * - 404 User not found
 */
authRouter.post('/signin', validate(userSchema), signin);

/**
 * @api {post} /auth/logout Logout
 * @apiName Logout
 * @apiGroup Auth
 * @apiDescription To logout from your account
 *
 * @apiSuccessExample
 * - 200 User successfully logged out
 */
authRouter.post('/logout', destroySession);

/**
 * @api {post} /auth/isAuthenticated isAuthenticated
 * @apiName isAuthenticated
 * @apiGroup Auth
 * @apiDescription To check if user is authenticated
 *
 * @apiSuccessExample
 * - 200 User is authenticated
 *
 * @apiError
 * - 401 User is not authenticated
 */
authRouter.post('/is-authenticated', isAuthenticated);

export default authRouter;
