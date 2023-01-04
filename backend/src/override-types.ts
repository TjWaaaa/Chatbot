import { Cookie, Session } from 'express-session';
import { UserId } from './types/session-user-id';
declare module 'express-session' {
	interface Session {
		user?: UserId;
	}
	interface SessionData {
		user?: UserId;
	}
}

declare module 'express' {
	interface RequestHandler {
		cookie: Cookie;
	}
}

declare module 'http' {
	interface IncomingMessage {
		session: Session;
	}
}
