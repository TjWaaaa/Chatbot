import {
	createUser,
	deleteUserById,
	readUserByEmail,
	readUserById,
	updateUserEmail,
} from '../../services/controllers/user';
import { Context, createMockContext, MockContext } from '../../configs/prisma';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
	mockCtx = createMockContext();
	ctx = mockCtx as unknown as Context;
});

describe('db actions User - createUser', () => {
	it('shoud create user on database', async () => {
		const user = {
			id: '1',
			email: 'test@test.de',
			hashedPassword: 'testtest',
			chats: [],
		};

		mockCtx.prisma.user.create.mockResolvedValue(user);

		await expect(createUser(user.email, user.hashedPassword, ctx)).resolves.toMatchObject({
			email: 'test@test.de',
		});
	});

	it('should fail because user already exists', async () => {
		const user = {
			id: '1',
			email: 'test@test.de',
			hashedPassword: 'testtest',
			chats: [],
		};

		mockCtx.prisma.user.findUnique.mockResolvedValue(user);

		await expect(createUser(user.email, user.hashedPassword, ctx)).rejects.toThrowError(
			new Error('User already exists'),
		);
	});
});

describe('db actions user - updateUser', () => {
	it('should read user data by email', async () => {
		const user = {
			id: '1',
			email: 'test@test.de',
			hashedPassword: 'testtest',
			chats: [],
		};

		mockCtx.prisma.user.findUnique.mockResolvedValue(user);

		await expect(readUserByEmail(user.email, ctx)).resolves.toMatchObject({
			email: user.email,
		});
	});

	it('should read user data by id', async () => {
		const user = {
			id: '1',
			email: 'test@test.de',
			hashedPassword: 'testtest',
			chats: [],
		};

		mockCtx.prisma.user.findUnique.mockResolvedValue(user);

		await expect(readUserById(user.id, ctx)).resolves.toMatchObject({
			id: user.id,
		});
	});
});

describe('db actions user - updateUser', () => {
	it('should update user email', async () => {
		const user = {
			id: '1',
			email: 'test@test.de',
			hashedPassword: 'testtest',
			chats: [],
		};

		mockCtx.prisma.user.findUnique.mockResolvedValue(user);
		mockCtx.prisma.user.update.mockResolvedValue({ ...user, email: 'hello@test.de' });

		await expect(updateUserEmail(user.id, 'hello@test.de', ctx)).resolves.toEqual(true);
	});

	it('should deny update user email because user with email cannot be found', async () => {
		const user = {
			id: '1',
			email: 'test@test.de',
			hashedPassword: 'testtest',
			chats: [],
		};

		mockCtx.prisma.user.findUnique.mockResolvedValue(null);
		mockCtx.prisma.user.update.mockResolvedValue(user);

		await expect(updateUserEmail(user.id, 'hello@test.de', ctx)).resolves.toEqual(false);
	});
});

describe('db actions user - deleteUser', () => {
	it('should delete user', async () => {
		const user = {
			id: '1',
			email: 'test@test.de',
			hashedPassword: 'testtest',
			chats: [],
		};

		mockCtx.prisma.user.findUnique.mockResolvedValue(user);

		await expect(deleteUserById(user.id, ctx)).resolves.toEqual(true);
	});

	it('should deny delete user because user id doesnt exist', async () => {
		const user = {
			id: '1',
			email: 'test@test.de',
			hashedPassword: 'testtest',
			chats: [],
		};

		mockCtx.prisma.user.findUnique.mockResolvedValue(null);

		await expect(deleteUserById(user.id, ctx)).resolves.toEqual(false);
	});
});
