import axios from 'axios';
import logger from '../utils/logger';
import { getJoke } from '../services/joke/get-joke';

jest.mock('axios');
jest.mock('../utils/logger', () => ({
	info: jest.fn(),
}));

const mockedJoke = 'Why was the math book sad? It had too many problems.';
const mockedAxiosResponse = { data: [{ text: mockedJoke }] };

describe('getJoke', () => {
	beforeEach(() => {
		(axios.get as jest.Mock).mockResolvedValue(mockedAxiosResponse);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return the joke', async () => {
		const result = await getJoke();
		expect(result).toEqual(mockedJoke);
	});

	it('should log the joke', async () => {
		await getJoke();
		expect(logger.info).toHaveBeenCalledWith(`Joke: ${mockedJoke}`);
	});
});
