import { Cookie, Session } from 'express-session';
import { IncomingMessage } from 'http';

declare module 'express-session' {
	interface Session {
		userId?: string;
	}
	interface SessionData {
		userId?: string;
	}
}

declare module 'express' {
	interface RequestHandler {
		cookie: Cookie;
	}
}

export interface IncomingMessageWS extends IncomingMessage {
	session: Session;
}
