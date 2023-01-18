import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import MessageUser from '../../components/ChatBot/MessageUser';
import MessageBot from '../../components/ChatBot/MessageBot';

afterEach(() => {
	cleanup();
});

test('MessageUser test', () => {
	render(<MessageUser text="das ist die Nachricht von einem User" img="test-image.jpg" />);
	const element = screen.getByTestId('id1');
	expect(element).toBeInTheDocument();
	expect(element).toHaveTextContent('das ist die Nachricht von einem User');
});

test('MessageBot test', () => {
	render(<MessageBot text="das ist die Nachricht von einem Bot" img="test-image.jpg" />);
	const element = screen.getByTestId('id2');
	expect(element).toBeInTheDocument();
	expect(element).toHaveTextContent('das ist die Nachricht von einem Bot');
});

test('matches snapshot MessageUser', () => {
	const tree = renderer
		.create(<MessageUser text="das ist die Nachricht von einem User" img="test-image.jpg" />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

test('matches snapshot MessageBot', () => {
	const tree = renderer
		.create(<MessageBot text="das ist die Nachricht von einem Bot" img="test-image.jpg" />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
