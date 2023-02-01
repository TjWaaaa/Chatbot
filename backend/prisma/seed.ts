import logger from '../src/utils/logger';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { chatOnboardingData } from '../src/data/chatOnboarding.data';

const prisma = new PrismaClient();

const userData = [
	{
		email: 'admin@chatbot.de',
		password: 'chatbot123',
	},
];

async function main() {
	logger.info(`Start seeding...`);
	userData.map(async (u) => {
		const { email, password } = u;

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				email,
				hashedPassword,
			},
		});

		logger.info(`User ${newUser.id} created`);

		chatOnboardingData.forEach(async (chat) => {
			await prisma.chat.create({
				data: {
					chatBotType: chat.chatBotType,
					name: chat.name,
					img: chat.img,
					userId: newUser.id,
					messages: {
						createMany: {
							data: chat.messages,
						},
					},
				},
			});
		});
		logger.info(`Seeding finished.`);
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
