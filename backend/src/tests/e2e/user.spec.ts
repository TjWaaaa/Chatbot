import request from 'supertest';
import { app } from '../..';
import chat from '../../services/db/chat';
import userDb from '../../services/db/user';

describe('User Endpoints', () => {
	const getUserById = jest.spyOn(userDb, 'getUserById');
	const getUserByEmail = jest.spyOn(userDb, 'getUserByEmail');
	const createUser = jest.spyOn(userDb, 'createUser');
	const createOnboardingMessages = jest.spyOn(chat, 'createOnboardingMessages');
	const updateUserEmailById = jest.spyOn(userDb, 'updateUserEmailById');
	const deleteUserById = jest.spyOn(userDb, 'deleteUserById');

	it('should create new user', async () => {
		const user1 = {
			id: '1',
			email: 'test@test.de',
			hashedPassword: 'testtest',
			chats: [],
		};

		getUserByEmail.mockResolvedValue(null);
		createUser.mockResolvedValue(user1);
		createOnboardingMessages.mockResolvedValue([]);

		const response = await request(app)
			.post('/users')
			.set({ 'csrf-token': 'cbacb' })
			.send({ email: 'test@test.de', password: 'testtest' })
			.expect(200);

		expect(response.text).toContain('Benutzer erstellt');
	});

	it('should read user with email e2e@testb.de', async () => {
		const user1 = {
			id: '1',
			email: 'test@test.de',
			hashedPassword: 'testtest',
			chats: [],
		};

		getUserById.mockResolvedValue(user1);

		const response = await request(app)
			.get('/users/1')
			.set({ 'csrf-token': 'cbacb', Accept: 'application/json' })
			.expect(200);

		expect(response.text).toContain('test@test.de');
	});

	it('should update user', async () => {
		const user1 = {
			id: '1',
			email: 'test@test.de',
			hashedPassword: 'testtest',
			chats: [],
		};

		getUserById.mockResolvedValue(user1);
		updateUserEmailById.mockResolvedValue(user1);

		const response = await request(app)
			.patch('/users/1')
			.set({ 'csrf-token': 'cbacb' })
			.send({ email: 'a@a.de', password: 'testtest' })
			.expect(200);

		expect(response.text).toContain('Benutzer geändert');
	});

	it('should delete user with email e2e@test.de', async () => {
		const user1 = {
			id: '1',
			email: 'test@test.de',
			hashedPassword: 'testtest',
			chats: [],
		};

		deleteUserById.mockResolvedValue(user1);

		const response = await request(app).delete('/users/1').set({ 'csrf-token': 'cbacb' }).expect(200);

		expect(response.text).toContain('Benutzer gelöscht');
	});
});
