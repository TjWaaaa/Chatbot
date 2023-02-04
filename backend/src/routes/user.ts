import express from 'express';
import user from '../controllers/user';
import { emailSchema } from '../schemas/email';
import { validate } from '../utils/validate';

const userRouter: express.Router = express.Router();

userRouter.post('/', user.postUser);

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
userRouter.patch('/:id', validate(emailSchema), user.updateUserEmail);

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
userRouter.delete('/:id', user.deleteUser);

export default userRouter;
