import { Cookie, Session } from 'express-session';

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

declare module 'http' {
	interface IncomingMessage {
		session: Session;
	}
}
