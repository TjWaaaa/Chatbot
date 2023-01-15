import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ChatBots from '../../components/ChatBots';

describe('ChatBots', () => {
	let store;

	beforeEach(() => {
		const reducer = (state, action) => {
			switch (action.type) {
				case 'ChangeChatId':
					return { ...state, ChatId: action.payload };
				case 'ClearChat':
					return { ...state, chat: [] };
				default:
					return state;
			}
		};
		store = createStore(reducer, { chatState: { ChatId: 1 } });
	});

	it('ChatBots Test', () => {
		const mockedEvent = jest.fn();

		render(
			<Provider store={store}>
				<ChatBots
					name="Test Name"
					img="test-image.jpg"
					text="Test Text"
					time="Test Time"
					event={mockedEvent}
					id={2}
				/>
			</Provider>,
		);

		const component = screen.getByTestId('id1');

		expect(component).toBeInTheDocument();
		expect(component).toHaveTextContent('Test Name');
		expect(component).toHaveTextContent('Test Text');
		expect(component).toHaveTextContent('Test Time');
	});

	test('matches snapshot', () => {
		const mockedEvent = jest.fn();

		const tree = renderer
			.create(
				<Provider store={store}>
					<ChatBots
						name="Test Name"
						img="test-image.jpg"
						text="Test Text"
						time="Test Time"
						event={mockedEvent}
						id={2}
					/>
				</Provider>,
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
