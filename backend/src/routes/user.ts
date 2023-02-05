import express from 'express';
import user from '../controllers/user';
import { emailSchema } from '../schemas/email';
import { userSchema } from '../schemas/user';
import { validate } from '../utils/validate';

const userRouter: express.Router = express.Router();

/**
 * @api {post} /users
 * @apiName Create User
 * @apiGroup User
 * @apiDescription Create a user
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiSuccessExample
 * - 200 User created
 * {
 * "message": "User created"
 * }
 * @apiError
 * - 400 User already exists
 * */
userRouter.post('/', validate(userSchema), user.postUser);

/**
 * @api {get} /users/:id
 * @apiName Get User
 * @apiGroup User
 * @apiDescription Get a user
 * @apiParam {String} id User id
 * @apiSuccessExample
 * - 200 User found
 * {
 * "user": {
 * "id": "1",
 * "email": "
 * }
 * }
 * @apiError
 * - 400 User not found
 * */
userRouter.get('/', user.getUser);

/**
 * @api {patch} /users/:id
 * @apiName Update Email
 * @apiGroup User
 * @apiDescription Update email of a user
 *
 * @apiSuccessExample
 *  - 200 Email updated successfully
 *
 * @apiError
 * - 400 User not found
 *  */
userRouter.patch('/:id', validate(emailSchema), user.patchUser);

/**
 * @api {delete} /users/:id
 * @apiName Delete User
 * @apiGroup User
 * @apiDescription Deletes a user
 *
 * @apiSuccessExample
 *  - 200 User deleted successfully
 *
 * @apiError
 * - 400 User not found
 *  */
userRouter.delete('/:id', user.deleteU);

export default userRouter;
