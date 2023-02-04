import { mockedSocketClient } from '../../src/utils/mocked-socket';
describe('Test Chat overview', () => {
	beforeEach(() => {
		cy.intercept(
			{
				method: 'POST', // Route all GET requests
				url: '/auth/isAuthenticated', // that have a URL that matches '/users/*'
			},
			{ status: 200 }, // and force the response to be: []
		).as('isAuthenticated'); // and assign an alias
	});

	afterEach(() => {
		mockedSocketClient.reset();
	});

	it('chats are loaded', () => {
		cy.visit('localhost:3000');
		cy.get('#chatBot0').should('be.visible');
		cy.get('#chatBot1').should('be.visible');
		cy.get('#chatBot2').should('be.visible');
	});
	it('navigation to chat is possibile', () => {
		cy.visit('localhost:3000');
		cy.get('#chatInputField').should('not.exist');
		cy.get('.chatBotMessage').should('not.exist');
		cy.get('#chatBot0').click();
		cy.get('#chatInputField').should('be.visible');
		cy.get('.chatBotMessage').should('be.visible');
		cy.get('.chatBotMessage').contains('Hallo, ich bin Jan.');
	});
	it('navigation between chats is possibile and messages are switching', () => {
		cy.visit('localhost:3000');
		cy.get('.chatBotMessage').should('not.exist');
		cy.get('#chatInputField').should('not.exist');
		cy.get('#chatBot0').click();
		cy.get('.chatBotMessage').should('be.visible');
		cy.get('#chatInputField').should('be.visible');
		cy.get('.chatBotMessage').contains('Hallo, ich bin Jan.');

		cy.get('.chatBotMessage').contains('Frag mich nach nem Witz.').should('not.exist');
		cy.get('#chatBot1').click();
		cy.get('.chatBotMessage').should('be.visible');
		cy.get('#chatInputField').should('be.visible');
		cy.get('.chatBotMessage').contains('Frag mich nach nem Witz.').should('be.visible');
		cy.get('.chatBotMessage').contains('Hallo, ich bin Jan.').should('not.exist');

		cy.get('.chatBotMessage')
			.contains('Frag mich einfach: Übersetze mir das ins Englische: Guten Tag.')
			.should('not.exist');
		cy.get('#chatBot2').click();
		cy.get('.chatBotMessage').should('be.visible');
		cy.get('#chatInputField').should('be.visible');
		cy.get('.chatBotMessage')
			.contains('Frag mich einfach: Übersetze mir das ins Englische: Guten Tag.')
			.should('be.visible');
		cy.get('.chatBotMessage').contains('Frag mich nach nem Witz.').should('not.exist');
		cy.get('.chatBotMessage').contains('Hallo, ich bin Jan.').should('not.exist');

		cy.get('#chatBot1').click();
		cy.get('.chatBotMessage').should('be.visible');
		cy.get('.chatBotMessage').contains('Frag mich nach nem Witz.').should('be.visible');
		cy.get('.chatBotMessage').contains('Hallo, ich bin Jan.').should('not.exist');
	});
	it('writing messages is possible', () => {
		cy.visit('localhost:3000');
		cy.get('#chatInputField').should('not.exist');
		cy.get('#chatBot0').click();
		cy.get('#chatInputField').should('be.visible');
		cy.get('.chatBotMessage').should('be.visible');

		cy.get('#lottie').should('not.exist');
		cy.get('#chatInputField').type('Hello, World');
		cy.get('.chatBotMessage').contains('Here is your input: Hello World').should('not.exist');
		cy.get('#sendMessageButton').click();
		cy.get('#lottie').should('be.visible');
		cy.get('.chatBotMessage').contains('Test Answer! Here is your input: ').should('be.visible');
		cy.get('#lottie').should('not.exist');
	});
	it('written messages are stored', () => {
		cy.visit('localhost:3000');
		cy.get('#chatInputField').should('not.exist');
		cy.get('#chatBot0').click();
		cy.get('#chatInputField').should('be.visible');
		cy.get('.chatBotMessage').should('be.visible');

		cy.get('#lottie').should('not.exist');
		cy.get('#chatInputField').type('Hello, World');
		cy.get('.chatBotMessage').contains('Here is your input: Hello World').should('not.exist');
		cy.get('#sendMessageButton').click();
		cy.get('#lottie').should('be.visible');
		cy.get('.chatBotMessage').contains('Test Answer! Here is your input: ').should('be.visible');
		cy.get('#lottie').should('not.exist');

		cy.get('#chatBot2').click();
		cy.get('.chatBotMessage').contains('Test Answer! Here is your input: ').should('not.exist');
		cy.get('#chatBot0').click();
		cy.get('.chatBotMessage').contains('Test Answer! Here is your input: ').should('be.visible');
	});
});
