import { Context } from '../../configs/prisma';
import { ChatBotType } from '../../enums/chat-bot-type';

export async function getChat(userId: string, chatBotType: ChatBotType, ctx: Context) {
	return await ctx.prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			chats: {
				where: {
					chatBotType: chatBotType,
				},
				select: {
					id: true,
					chatBotType: true,
					messages: true,
				},
			},
		},
	});
}
