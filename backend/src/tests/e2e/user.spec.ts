import request from 'supertest';
import { app } from '../..';
import chat from '../../services/db/chat';
import userDb from '../../services/db/user';
// import chat from '../../services/db/chat';

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

		const onboardingMessages = [
			{
				id: '977e3358-8821-41c5-96c0-58e42e9b4fb7',
				chatBotType: 'businessMan',
				userId: '11c880af-666a-41bd-b81b-8345bf849cd8',
				img: 'https://cdn.24.co.za/files/Cms/General/d/2866/a0094e37e2b34dabbdbdf20461f3b23b.jpg',
				name: 'Der agressive Jan',
			},
			{
				id: '260d0835-e21a-45ce-94b0-3f80061b3cfe',
				chatBotType: 'joke',
				userId: '11c880af-666a-41bd-b81b-8345bf849cd8',
				img: 'https://static8.depositphotos.com/1594308/1073/i/450/depositphotos_10733626-stock-photo-unhappy-fools-day.jpg',
				name: 'Moe der Commedian',
			},
			{
				id: '58f2102a-4d11-4bcb-953b-d203f45bac75',
				chatBotType: 'translator',
				userId: '11c880af-666a-41bd-b81b-8345bf849cd8',
				img: 'https://img.fotocommunity.com/aelterer-mann-a688a83e-f251-4ffd-8b89-a7679bbb95ef.jpg?height=1000',
				name: 'Der alte Lehrer',
			},
		];

		getUserByEmail.mockResolvedValue(null);
		createUser.mockResolvedValue(user1);
		// createOnboardingMessages.mockResolvedValue(onboardingMessages);

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

	it('should delete user with email e2e@testc.de', async () => {
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
