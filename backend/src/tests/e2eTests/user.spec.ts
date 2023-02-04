import request from 'supertest';
import { app } from '../..';

describe('User Endpoints', () => {
	it('should read user with email e2e@testb.de', async () => {
		const response = await request(app).get('/users').send({ email: 'e2e@testb.de' }).expect(200);

		console.log(response);
	});

	// it('should create new user', async () => {
	// 	request(app).post('/users');
	// });

	// it('should delete user with email e2e@testc.de', async () => {
	// 	var config = {
	// 		method: 'delete',
	// 		url: 'http://localhost:8000/users/',
	// 		headers: {
	// 			'csrf-token': 'cbacb',
	// 			'Content-Type': 'application/json',
	// 		},
	// 	};

	// 	const res = await axios(config);

	// 	expect(res.status).toEqual(200);
	// });
});
