import axios from 'axios';
import logger from '../utils/logger';
import { getTranslation } from '../services/translation/get-translation';

jest.mock('axios');
jest.mock('../utils/logger', () => ({
	info: jest.fn(),
}));

const mockedTranslation = 'Why was the math book sad? It had too many problems.';
const mockedAxiosResponse = { data: { translations: [{ text: mockedTranslation }] } };

describe('getTranslation', () => {
	beforeEach(() => {
		(axios.post as jest.Mock).mockResolvedValue(mockedAxiosResponse);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should send the translation to the socket', async () => {
		const result = await getTranslation('translate pls');
		expect(result).toEqual(mockedTranslation);
	});

	it('should log the translation', async () => {
		await getTranslation('translation pls');
		expect(logger.info).toHaveBeenCalledWith(`Translation: ${mockedTranslation}`);
	});
});
