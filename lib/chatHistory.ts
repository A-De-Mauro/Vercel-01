import { Prisma } from '@prisma/client'

import prisma from './prisma'

export async function getAllHistoryIds() {
  const historyIds = await prisma.chatHistory.findMany({
    select: {
      id: true,
    },
  })
  return historyIds.map(({ id }) => ({ id }))
}

export async function getChatHistory(chatHistoryId?: string) {
  const chats = await prisma.chatHistory.findUnique({
    where: { id: chatHistoryId },
    select: {
      id: true,
      openedAtDate: true,
      closedAtDate: true,
      isSolved: true,
      supportProfileId: true,
      clientProfileId: true,
    },
  })
  return chats
}

export async function getMessage(messageId?: string) {
  const chats = await prisma.message.findUnique({
    where: { id: messageId },
  })
  return chats
}

export type ChatHistory = Prisma.PromiseReturnType<typeof getChatHistory>
export type Message = NonNullable<Prisma.PromiseReturnType<typeof getMessage>>
