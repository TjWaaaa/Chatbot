import express from 'express';
import user from '../routeHandler/user';
import { emailSchema } from '../../schemas/email';
import { validate } from '../../utils/validate';

const userRouter: express.Router = express.Router();

userRouter.get('/', user.getUser);

userRouter.post('/', user.postUser);

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
userRouter.delete('/:id', user.deleteUser);

export default userRouter;
