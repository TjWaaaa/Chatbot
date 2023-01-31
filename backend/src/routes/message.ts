import express from 'express';
import message from '../controllers/message';
import { messageSchema } from '../schemas/message';
import { validate } from '../utils/validate';

const messageRouter: express.Router = express.Router();

/**
 * @api {get} /messages/:id
 * @apiName Get Message
 * @apiGroup Message
 * @apiDescription Get a message by id
 *
 * @apiSuccessExample
 *  - 200 message
 *
 * @apiError
 * - 400 Es existiert keine Nachricht mit dieser ID. Bitte erstelle eine Nachricht.
 * - 400 Ein Fehler beim Abrufen der Nachricht ist passiert. Versuche es erneut oder kontaktiere den Support.
 *  */
messageRouter.get('/:id', message.getMessage);

/**
 * @api {patch} /messages/:id
 * @apiName Update Message
 * @apiGroup Message
 * @apiDescription Update a message by id
 *
 * @apiSuccessExample
 *  - 200 Nachricht geändert
 *
 * @apiError
 * - 400 Es existiert keine Nachricht mit dieser ID. Bitte erstelle eine Nachricht.
 * - 400 Ein Fehler beim Updaten der Nachricht ist passiert. Versuche es erneut oder kontaktiere den Support.
 * - 400 text is erforderlich.
 *  */
messageRouter.patch('/:id', validate(messageSchema), message.updateMessage);

/**
 * @api {delete} /messages
 * @apiName Delete All Messages
 * @apiGroup Message
 * @apiDescription All messages of a user will be deleted
 *
 * @apiSuccessExample
 *  - 200 Nachrichten gelöscht
 *
 * @apiError
 * - 400 Ein Fehler beim Löschen der Nachrichten ist passiert. Versuche es erneut oder kontaktiere den Support.
 *  */
messageRouter.delete('', message.deleteAll);

export default messageRouter;
