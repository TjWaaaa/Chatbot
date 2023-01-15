import logger from '../src/utils/logger';
import { sendMessage } from '../src/services/sendMessage';
import { getBusinessAdvice } from '../src/services/business-advice/get-business-advice';

jest.mock('../src/utils/logger', () => ({
  info: jest.fn()
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
