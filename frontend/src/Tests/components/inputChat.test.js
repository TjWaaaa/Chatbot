import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import InputChat from '../../components/InputChat';

afterEach(() => {
	cleanup();
});

test('InputChat should be mobile', () => {
	render(<InputChat sendMessage={null} isMobile={true} />);
	const element = screen.getByTestId('id1');
	expect(element).toBeInTheDocument();
	expect(element).toHaveStyle({ width: '100vw' });
});

test('InputChat should not be mobile', () => {
	render(<InputChat sendMessage={null} isMobile={false} />);
	const element = screen.getByTestId('id1');
	expect(element).toBeInTheDocument();
	expect(element).toHaveStyle({ width: 'calc(100vw - 384px)' });
});

test('matches snapshot', () => {
	const tree = renderer.create(<InputChat sendMessage={null} isMobile={false} />).toJSON();
	expect(tree).toMatchSnapshot();
});
