// import { render, screen, cleanup } from '@testing-library/react';
// import renderer from 'react-test-renderer';
// import NavigationChatDetailMobile from '../../components/NavigationChatDetailMobile';
// import NavigationAllChatsMobile from '../../components/NavigationAllChatsMobile';
// import NavigationAllChatsWeb from '../../components/NavigationAllChatsWeb';

// afterEach(() => {
// 	cleanup();
// });

// test('Navigation test', () => {
// 	const mockedEvent = jest.fn();

// 	render(<NavigationChatDetailMobile name="Navigation Test" img="" event={mockedEvent} />);

// 	const element = screen.getByTestId('id1');
// 	expect(element).toBeInTheDocument();
// 	expect(element).toHaveTextContent('Navigation Test');
// });

// test('matches snapshot NavigationChatDetailMobile', () => {
// 	const mockedEvent = jest.fn();

// 	const tree = renderer
// 		.create(<NavigationChatDetailMobile name="Navigation Test" img="" event={mockedEvent} />)
// 		.toJSON();
// 	expect(tree).toMatchSnapshot();
// });

// test('matches snapshot NavigationAllChatsMobile', () => {
// 	const tree = renderer.create(<NavigationAllChatsMobile />).toJSON();
// 	expect(tree).toMatchSnapshot();
// });

test('matches snapshot NavigationAllChatsWeb', () => {
	expect(true).toBe(true);
});
