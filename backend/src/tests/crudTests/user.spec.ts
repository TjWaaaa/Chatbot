import { Context, createMockContext, MockContext } from '../../configs/prisma';
import { USER_DOES_NOT_EXIST } from '../../consts/error-messages';
import { signUserUp } from '../../services/auth/sign-user-up';
import userDb from '../../services/db/user';
import { deleteUser } from '../../services/user/delete-user';
import { updateUserEmail } from '../../services/user/update-user';

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

		await expect(signUserUp(user.email, user.hashedPassword, ctx)).resolves.toMatchObject({
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

		await expect(signUserUp(user.email, user.hashedPassword, ctx)).rejects.toThrowError(
			new Error('Ein Benutzer mit dieser E-Mail Adresse existiert bereits. Bitte melde dich an.'),
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

		await expect(userDb.getUserByEmail(user.email, ctx)).resolves.toMatchObject({
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

		await expect(userDb.getUserById(user.id, ctx)).resolves.toMatchObject({
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

		const updateEmail = 'hello@test.de';

		mockCtx.prisma.user.findUnique.mockResolvedValue(user);
		mockCtx.prisma.user.update.mockResolvedValue({ ...user, email: updateEmail });

		await expect(updateUserEmail(user.id, 'hello@test.de', ctx)).resolves.toMatchObject({
			...user,
			email: updateEmail,
		});
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

		await expect(updateUserEmail(user.id, 'hello@test.de', ctx)).rejects.toThrowError(
			new Error(USER_DOES_NOT_EXIST),
		);
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
		mockCtx.prisma.user.delete.mockResolvedValue(user);

		await expect(deleteUser(user.id, ctx)).resolves.toMatchObject({
			id: '1',
			email: 'test@test.de',
			hashedPassword: 'testtest',
		});
	});
	it('should deny delete user because user id doesnt exist', async () => {
		const user = {
			id: '1',
			email: 'test@test.de',
			hashedPassword: 'testtest',
			chats: [],
		};

		mockCtx.prisma.user.findUnique.mockResolvedValue(null);

		await expect(deleteUser(user.id, ctx)).rejects.toThrowError(new Error(USER_DOES_NOT_EXIST));
	});
});
