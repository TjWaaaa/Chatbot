import logger from '../utils/logger';
import { getBusinessAdvice } from '../services/business-advice/get-business-advice';

jest.mock('../utils/logger', () => ({
	info: jest.fn(),
}));

describe('getJoke', () => {
	it('should send the advice to the socket', async () => {
		const advices = ['Advice 1', 'Advice 2', 'Advice 3'];
		const result = await getBusinessAdvice();
		expect(advices.includes(result)).toBe(true);
	});

	it('should log the advice', async () => {
		await getBusinessAdvice();
		expect(logger.info).toHaveBeenCalled();
	});
});
